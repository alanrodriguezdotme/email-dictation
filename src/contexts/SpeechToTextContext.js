import React, { createContext, useContext } from 'react'
import * as SDK from 'microsoft-speech-browser-sdk'
import listeningEarcon from '../assets/earcons/earcon-listening.wav'
import stopEarcon from '../assets/earcons/earcon-stoplistening.wav'

import { GlobalContext } from './GlobalContext'

let subscriptionKey = '5bb1fd777df040f18623d946d3ae2833'
let serviceRegion = 'westus'
let recognizer
let skipLuis = false

// set up AudioContext now, to detect if suspended (Chrome doesn't let you play audio unless there is a user gesture first (i.e., click))
let audio = new AudioContext()

export const SpeechToTextContext = createContext()

const SpeechToTextContextProvider = (props) => {
	const { setSttState, setAvatarState, setUtterance, setCortanaText, resetVoice } = useContext(GlobalContext)

	const initStt = (dictation) => {
		recognizer = recognizerSetup(
			SDK,
			dictation ? SDK.RecognitionMode.Dictation : SDK.RecognitionMode.Interactive,
			'en-US',
			'Detailed',
			subscriptionKey
		)
	}

	const resumeAudioContext = () => {
		audio.resume()
		console.log('user clicked, audio resumed')
	}

	const recognizerSetup = (SDK, recognitionMode, language, format, subscriptionKey) => {
		let recognizerConfig = new SDK.RecognizerConfig(
			new SDK.SpeechConfig(
				new SDK.Context(
					new SDK.OS(navigator.userAgent, "Browser", null),
					new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
			recognitionMode, // SDK.RecognitionMode.Interactive  (Options - Interactive/Conversation/Dictation)
			language, // Supported languages are specific to each recognition mode Refer to docs.
			format) // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)

		// Alternatively use SDK.CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) for token auth
    let authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey)

		return SDK.CreateRecognizer(recognizerConfig, authentication)
	}

	const playEarcon = (state) => {
		let earcon
		if (state === 'on') {
			earcon = new Audio(listeningEarcon)
		} else {
			earcon = new Audio(stopEarcon)
		}

		earcon.play()
	}

	const handleMicClick = (actions, shouldSkipLuis) => {
		if (recognizer) {
			recognizerStart(SDK, recognizer, actions)
			if (shouldSkipLuis != undefined && shouldSkipLuis != null) {
				skipLuis = shouldSkipLuis
			} else {
				skipLuis = false
			}
		} else {
			console.error("can't find recognizer")
		}
  }

	const recognizerStart = (SDK, recognizer, actions) => {
		recognizer.Recognize((event) => {
			switch (event.Name) {
				case "RecognitionTriggeredEvent":
					setSttState('RecognitionTriggeredEvent')
					setAvatarState('listening')
					console.log("Initializing")
					playEarcon('on')
					break
				case "ListeningStartedEvent":
					console.log("Listening")
					setSttState('ListeningStartedEvent')
					break
				case "RecognitionStartedEvent":
					console.log("Listening_Recognizing")
					break
				case "SpeechStartDetectedEvent":
					console.log("Listening_DetectedSpeech_Recognizing")
					console.log(JSON.stringify(event.Result)) // check console for other information in result
					break
				case "SpeechHypothesisEvent":
					console.log(JSON.stringify(event.Result)) // check console for other information in result
					setUtterance(event.result.Text)
					setSttState('SpeechHypothesisEvent')
					setCortanaText(null)
					break
				case "SpeechFragmentEvent":
					console.log(JSON.stringify(event.Result)) // check console for other information in result
					break
				case "SpeechEndDetectedEvent":
					console.log("Processing_Adding_Final_Touches")
					console.log(JSON.stringify(event.Result)) // check console for other information in result
					// playEarcon('stoplistening')
					setSttState('SpeechEndDetectedEvent')
					setAvatarState('thinking')
					break
				case "SpeechSimplePhraseEvent":
					break
				case "SpeechDetailedPhraseEvent":
					setSttState('SpeechDetailedPhraseEvent')
					if (event.Result.NBest) {
						console.log(event.Result.NBest[0].ITN)
						setUtterance(event.Result.NBest[0].ITN)
						if (!skipLuis) {
							// getLuisResponse goes here
							actions.getLuisData(JSON.stringify(event.result.NBest[0].ITN), actions)
						}
					} else {
						setAvatarState('calm')
					}
					break
				case "RecognitionEndedEvent":
					setSttState(null)
					playEarcon()
					if (event.Result.NBest) {
            console.log(event.Result.NBest[0].ITN)
					}
					break
			}
		})
		.On(() => {
			// resetVoice()
		},
		(error) => {
			error && console.error('STT error', error)
			resetVoice()
			initStt()
		})
	}

	const recognizerStop = (reset) => {
		if (reset) {
			recognizer = null
		} else if (recognizer) {
			recognizer.AudioSource.TurnOff()
		} 
		resetVoice()
	}

	return (
		<SpeechToTextContext.Provider value={{ 
			initStt, 
			handleMicClick, 
			recognizerStop, 
			recognizerSetup, 
			resumeAudioContext 
		}}>
			{ props.children }
		</SpeechToTextContext.Provider>
	)
}

export default SpeechToTextContextProvider