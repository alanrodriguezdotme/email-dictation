import React, { useContext, createContext, useEffect } from 'react'
import * as _ from 'underscore'

import { GlobalContext } from '../contexts/GlobalContext'

export const LuisContext = createContext()

const LuisContextProvider = (props) => {
	let { setLuisData, resetVoice } = useContext(GlobalContext)

	const getLuisData = (utterance, actions) => {
		// Alan's LUIS account
		const LUIS_URL = 'LUIS_URL'

		return new Promise((resolve, reject) => {
			fetch(LUIS_URL + utterance)
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					setLuisData(data)
					let intent = data.prediction.topIntent
					let { score } = data.prediction.intents[intent]
					let { entities } = data.prediction

					if (intent) {
						console.log({ intent, score, entities })

						//check and see if we confidently know the intent, otherwise it is freeform text.
						if (score > .75) {
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
				if (actions.focus === null) {					
					actions.setShowCompose(true)
					actions.setUtterance(null)
					actions.setHeardCommandText(null)
					actions.setFocus('body')
					actions.setCortanaText("What's your message?")
					actions.startListening(actions, false, true)

					if (entities["Email.ContactName"]) {
						actions.setRecipients(entities["Email.ContactName"])
					}
				}
				break
			
			case 'Email.AddRecipient':
				if (!_.isEmpty(entities["Email.SenderName"]) || !_.isEmpty(entities["Email.ContactName"])) {
					let toAdd = entities["Email.SenderName"] ? entities["Email.SenderName"].concat(entities["Email.ContactName"]) : entities["Email.ContactName"]
					let newRecipients = [ ...actions.recipients ].concat(toAdd)
					console.log({ recipients: actions.recipients, entities: toAdd, newRecipients })
					actions.setRecipients(entities["Email.ContactName"])
				}
				break

			case 'Email.Send':
				actions.setShowCompose(false)
				actions.setShowPanel(false)
				actions.recognizerStop()
				setTimeout(() => {
					actions.setShowStatus(true)
				}, 1000)
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