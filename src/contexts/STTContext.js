import React, { createContext, useContext, useState, useEffect } from 'react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import { GlobalContext } from './GlobalContext'
import Sandbox, { HapticType } from '@open-studio/sandbox'
import { result } from 'underscore'

let subscriptionKey = 'ab3918c52b51410cae05d545fe5ce17f'
let authEndpoint = 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issuetoken'
let authToken
let serviceRegion = "westus"
let recognizer
let callbacksForSandbox

export const STTContext = createContext()

const STTContextProvider = (props) => {
	const { log, performHaptic } = Sandbox.system
	const { isRunning, toggleRunning } = Sandbox.speech
	const { setSttState, setUtterance, utterance, setHeardCommandText } = useContext(GlobalContext)
	let [ isInApp, setIsInApp ] = useState(false)

	const requestAuthToken = () => {
		if (authEndpoint) {
			let a = new XMLHttpRequest()
			a.open("GET", authEndpoint)
			a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			a.send("")
			a.onload = function() {
				console.log('responseText:', this)
				let token = JSON.parse(atob(this.responseText.split(".")[1]))
				serviceRegion = token.region
				authToken = this.responseText
				console.log("Got an auth token: " + token)
			}
		}
	}

	async function startListening(actions, shouldSkipLUIS, continuous) {
		callbacksForSandbox = { actions, shouldSkipLUIS, continuous }
		if (isInApp) {
			await toggleRunning()
			performHaptic(HapticType.medium)
		} else {
			let speechConfig
			if (authToken) {
				speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authToken, serviceRegion)
			} else {
				speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion)
			}

			speechConfig.speechRecognitionLanguage = "en-US"
			let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
			recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)

			setSttState("listening")
			console.log("listening...")

			recognizer.recognized = (sender, event) => {
				setSttState("recognized")
				setUtterance(event.result.text)
				console.log(event.result.text)
			}

			if (continuous) {
				recognizer.startContinuousRecognitionAsync(() => {
					console.log("listening continuously...")
				}, (error) => {
					console.error(error)
					stopListening()
				})
			} else {
				recognizer.recognizeOnceAsync(
					(result) => {
						console.log(result)
						setUtterance(result.text)
						setSttState("recognized")
						if (!shouldSkipLUIS) {
							actions.getLuisData(result.text, actions)
						}
						stopListening()
					},
					(error) => {
						console.log({error})
						stopListening()
					} 
				)
			}
		}
	}

	function stopListening() {
		if (isInApp) {
			if (isRunning()) { toggleRunning() }
		} else if (recognizer) {
			recognizer.close()
			recognizer = undefined
			console.log("stopped listening")
		}
		setSttState(null)
		setUtterance(null)
	}

	function getStringDiff(longerString, shorterString) {
		return longerString.split(shorterString).join('')
	}

	const debounce = (func, wait, immediate) => {
		let timeout;
		return function () {
			const context = this;
			const args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	useEffect(() => {
		setIsInApp(Sandbox.isInApp)

		// do something with results from iOS STT
		Sandbox.speech.setOnResultsCallback((results) => {
			if (results.text && isRunning()) {
				setUtterance(results.text)
			} else if (results.text && !isRunning()) {
				callbacksForSandbox.actions.getLuisData(results.text, callbacksForSandbox.actions)
			}
		})

		Sandbox.speech.setInputLevelCallback((input) => {
			debounce(toggleRunning, 6000, false)
			if (input > 0) {
				
			} 
		})

		Sandbox.speech.setIsRunningCallback((result) => {
			if (result) {
				log('listening...')
				setSttState('listening')
			} else {
				log('stopped listening')	
				setSttState(null)
				setUtterance(null)
			}
		})
	}, [])

	return (
		<STTContext.Provider value={{
			requestAuthToken,
			startListening,
			stopListening
		}}>
			{props.children}
		</STTContext.Provider>
	)
}

export default STTContextProvider