import React, { useContext, createContext, useEffect } from 'react'
import * as _ from 'underscore'

import { GlobalContext } from '../contexts/GlobalContext'
import { SpeechToTextContext } from './SpeechToTextContext'

export const LuisContext = createContext()

const LuisContextProvider = (props) => {
	let { setLuisData, resetVoice } = useContext(GlobalContext)
	let { handleMicClick, recognizerStop, initStt } = useContext(SpeechToTextContext)

	const getLuisData = (utterance, actions) => {
		// Alan's LUIS account
		const LUIS_URL = 'https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/b826c847-24a5-4fca-ac34-60a52054bc10/slots/staging/predict?subscription-key=7b66646eb6344aea8e22592a102bcc6d&verbose=true&show-all-intents=true&log=true&query='

		return new Promise((resolve, reject) => {
			fetch(LUIS_URL + utterance)
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					console.log(data)
					setLuisData(data)
					let intent = data.prediction.topIntent
					let { score } = data.prediction.intents[intent]
					let { entities } = data.prediction

					if (intent) {
						console.log({ intent, score, entities })

						//check and see if we confidently know the intent, otherwise it is freeform text.
						if (score > .6) {
							handleIntent(intent, entities, actions)
						}
					}

					resolve(data);
				})
				.catch((err) => {
					console.error(err)
					setLuisData(null)
					reject(err)
				});

		});
	}

	const handleIntent = (intent, entities, actions) => {
		switch(intent) {
			case 'Email.SendEmail':
				actions.setShowCompose(true)
				actions.setUtterance(null)
				actions.setFocus('body')
				actions.recognizerStop(true)
				actions.initStt(true)
				actions.handleMicClick(actions)
				actions.setCortanaText("What's your message?")

				if (entities) {
					actions.setRecipients(entities["Email.ContactName"])
				}
				break

			default:
				console.log('no actions found for this intent: ' + intent)
				break
		}
	}

	return (
		<LuisContext.Provider value={{ getLuisData }}>
			{ props.children }
		</LuisContext.Provider>
	)
}

export default LuisContextProvider