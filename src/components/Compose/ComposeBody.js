import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import * as _ from 'underscore'

const ComposeBody = ({ data }) => {
	const { setFocus, setCortanaText, focus, utterance, setHeardCommandText, setRecipients, recipients, luisData, sttState } = data
	const bodyRef = useRef(null)
	let [ bodyText, setBodyText ] = useState('')
	let [ utterances, setUtterances ] = useState([])

	useEffect(() => {
		console.log()
	}, [bodyRef])

	useEffect(() => {
		console.log({focus, utterance, bodyText})
		if (focus === 'body' && utterance) {
			if (sttState === 'SpeechDetailedPhraseEvent') {
				commandActions(utterance)
			} else if (sttState === 'SpeechFragmentEvent') {
				let string = utterances.join('')
				setBodyText(string + ' ' + utterance)
			}
		}
	}, [utterance, sttState])

	function commandActions(utterance) {
		let utterancesMinusLastOne = [...utterances].slice(0, -1)

		switch (checkForCommand(utterance)) {
			case 'delete':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ utterance }</span></span>)
				setUtterances(utterancesMinusLastOne)
				setBodyText([ ...utterancesMinusLastOne ].join(''))
				break
			case 'bold':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ utterance }</span></span>)
				utterancesMinusLastOne.push('<strong>' + [...utterances].splice(-1, 1) + '</strong>')
				setUtterances(utterancesMinusLastOne)
				setBodyText([ ...utterancesMinusLastOne ].join(''))
				break
			case 'italicize':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ utterance }</span></span>)
				utterancesMinusLastOne.push('<i>' + [...utterances].splice(-1, 1) + '</i>')
				setUtterances(utterancesMinusLastOne)
				setBodyText([ ...utterancesMinusLastOne ].join(''))
				break
			case 'add':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ utterance }</span></span>)
				setUtterances(utterances)
				setBodyText(utterances.join(''))
				break
			default:					
				let scrubbedUtterance = utterance.charAt(0).toUpperCase() + utterance.slice(1) + '. '
				setUtterances([ ...utterances, scrubbedUtterance ])
				setBodyText([ ...utterances, scrubbedUtterance ].join(''))
		}		
	}

	function checkForCommand(string) {
		// const deleteCommands = [
		// 	'delete',
		// 	'undo'
		// ]

		// const boldCommands = [
		// 	'bold that',
		// 	'bold this',
		// 	'bold'
		// ]

		// const italicizeCommands = [
		// 	'italicize'
		// ]

		// const addRecipientCommands = [
		// 	'add'
		// ]

		if (string.startsWith('delete')) {
			return 'delete'
		} else if (string.startsWith('bold')) {
			return 'bold'
		} else if (string.startsWith('italicize') || string.startsWith('italics')) {
			return 'italicize'
		} else if (string.startsWith('add')) {
			return 'add' 
		} else {
			 return null
		}

		// if (new RegExp(deleteCommands.join('|')).test(string)) {
		// 	return 'delete'
		// } else if (new RegExp(boldCommands.join('|')).test(string)) {
		// 	return 'bold'
		// } else if (new RegExp(italicizeCommands.join('|')).test(string)) {
		// 	return 'italicize'
		// } else if (new RegExp(addRecipientCommands.join('|')).test(string)) {
		// 	if (luisData && luisData.prediction.topIntent != 'Email.AddRecipient') {
		// 		return 'add'
		// 	}
		// } else {
		// 	return null
		// }
	}

	function handleFocus() {
		setFocus('body')
		setCortanaText("What's your message?")
	}

	function handleBodyTextChange(event) {
		console.log(event)
		setBodyText(event.target.value)
	}

	return (
		<Container>
			<ReactQuill 
				ref={ bodyRef }
				value={ bodyText }
				modules={{ toolbar: false }}
				onChange={ setBodyText }
				style={{ padding: '0 12px' }}
				onFocus={ handleFocus } />
			{/* <textarea 
				ref={ bodyRef }
				value={ bodyText }
				onChange={ handleBodyTextChange }
				onFocus={ () => handleFocus() } /> */}
		</Container>
	)
}

export default ComposeBody

const Container = styled.div`
	width: 100%;
	flex: 1;

	textarea {
		width: 100%;
		height: 100%;
		padding: 12px;
		font-size: 15px;
		font-family: 'SF Pro', sans-serif;
		color: #333;
		border: 0;
		outline: none;
	}
`
