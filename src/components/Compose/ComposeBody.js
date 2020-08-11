import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import * as _ from 'underscore'
import Sandbox from '@open-studio/sandbox'

const ComposeBody = ({ data }) => {
	const { setFocus, setCortanaText, focus, utterance, setHeardCommandText, setRecipients, recipients, luisData, sttState } = data
	const bodyRef = useRef(null)
	let [ bodyText, setBodyText ] = useState('')
	let [ utterances, setUtterances ] = useState([])

	useEffect(() => {
		console.log({focus, utterances, bodyText})
		if (focus === 'body' && utterance) {
			commandActions(utterance)
		}
	}, [utterance, sttState])

	function commandActions(utterance) {
		let utterancesMinusLastOne = [...utterances].slice(0, -1)
		let unformattedUtterance = utterance.toLowerCase().replace(/\./g,'')
		let inApp = Sandbox.isInApp

		switch (checkForCommand(utterance)) {
			case 'delete':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ unformattedUtterance }</span></span>)
				setUtterances(utterancesMinusLastOne)
				setBodyText(inApp ? utterance : [ ...utterancesMinusLastOne ].join(' '))
				break
			case 'bold':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ unformattedUtterance }</span></span>)
				utterancesMinusLastOne.push('<strong>' + [...utterances].splice(-1, 1) + '</strong>')
				setUtterances(utterancesMinusLastOne)
				setBodyText(inApp ? utterance : [ ...utterancesMinusLastOne ].join(' '))
				break
			case 'italicize':
				setHeardCommandText(<span>Heard <span className="heardCommand">{ unformattedUtterance }</span></span>)
				utterancesMinusLastOne.push('<i>' + [...utterances].splice(-1, 1) + '</i>')
				setUtterances(utterancesMinusLastOne)
				setBodyText(inApp ? utterance : [ ...utterancesMinusLastOne ].join(' '))
				break
			case 'add':
				console.log({recipients}, unformattedUtterance.replace('add ', ''))
				setRecipients([ ...recipients, unformattedUtterance.replace('add ', '')])
				setHeardCommandText(<span>Heard <span className="heardCommand">{ unformattedUtterance }</span></span>)
				setUtterances(utterances)
				setBodyText(inApp ? utterance : utterances.join(''))
				break
			default:					
				// let scrubbedUtterance = utterance.charAt(0).toUpperCase() + utterance.slice(1) + '. '
				setHeardCommandText(null)
				setUtterances([ ...utterances, utterance ])
				setBodyText(inApp ? utterance : [ ...utterances, utterance ].join(' '))
		}		
	}

	function checkForCommand(string) {
		let lowerCaseString = string.toLowerCase()
		lowerCaseString = lowerCaseString.replace(/\./g,'')
		console.log({lowerCaseString})

		if (Sandbox.isInApp) {
			if (lowerCaseString.endsWith('delete')) {
				return 'delete'
			} else if (lowerCaseString.endsWith('bold')) {
				return 'bold'
			} else if (lowerCaseString.endsWith('italicize') || string.endsWith('italics')) {
				return 'italicize'
			} else if (lowerCaseString.endsWith('add')) {
				return 'add' 
			} else {
				 return null
			}
		} else {
			if (lowerCaseString.startsWith('delete')) {
				return 'delete'
			} else if (lowerCaseString.startsWith('bold')) {
				return 'bold'
			} else if (lowerCaseString.startsWith('italicize') || string.startsWith('italics')) {
				return 'italicize'
			} else if (lowerCaseString.startsWith('add')) {
				return 'add' 
			} else {
				 return null
			}
		}
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
