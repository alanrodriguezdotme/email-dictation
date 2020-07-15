import React, { createContext, useContext } from 'react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import { GlobalContext } from './GlobalContext'

let subscriptionKey = 'ab3918c52b51410cae05d545fe5ce17f'
let authEndpoint = 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issuetoken'
let authToken
let serviceRegion = "westus"
let recognizer

export const STTContext = createContext()

const STTContextProvider = (props) => {
	const { setSttState, setUtterance, setHeardCommandText } = useContext(GlobalContext)

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

	function startListening(actions, shouldSkipLUIS, continuous) {
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

	function stopListening() {
		if (recognizer) {
			recognizer.close()
			recognizer = undefined
			setSttState("off")
			console.log("stopped listening")
		}
	}

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