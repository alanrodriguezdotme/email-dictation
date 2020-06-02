import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'

const ComposeBody = ({ data }) => {
	const { setFocus, setCortanaText, focus, utterance, setRecipients, recipients, luisData } = data
	const bodyRef = useRef(null)
	let [ bodyText, setBodyText ] = useState('')
	let [ utterances, setUtterances ] = useState([])

	useEffect(() => {
		console.log()
	}, [bodyRef])

	useEffect(() => {
		console.log({focus, utterance, bodyText})
		if (focus === 'body' && utterance) {			
			commandActions(utterance)
		}
	}, [utterance])

	function commandActions(utterance) {
		let utterancesMinusLastOne = [...utterances].slice(0, -1)

		switch (checkForCommand(utterance)) {
			case 'delete':
				setUtterances(utterancesMinusLastOne)
				setBodyText(utterancesMinusLastOne.join(''))
				break
			case 'bold':
				utterancesMinusLastOne.push('<strong>' + [...utterances].splice(-1, 1) + '</strong>')
				setUtterances(utterancesMinusLastOne)
				setBodyText([ ...utterancesMinusLastOne ].join(''))
				break
			case 'italicize':
				utterancesMinusLastOne.push('<i>' + [...utterances].splice(-1, 1) + '</i>')
				setUtterances(utterancesMinusLastOne)
				setBodyText([ ...utterancesMinusLastOne ].join(''))
				break
			case 'add':
				break
			default:					
				let scrubbedUtterance = utterance.charAt(0).toUpperCase() + utterance.slice(1) + '. '
				setUtterances([ ...utterances, scrubbedUtterance ])
				setBodyText([ ...utterances, scrubbedUtterance ].join(''))
		}		
	}

	function checkForCommand(string) {
		const deleteCommands = [
			'delete',
			'undo'
		]

		const boldCommands = [
			'bold that',
			'bold this',
			'bold'
		]

		const italicizeCommands = [
			'italicize'
		]

		const addRecipientCommands = [
			'add'
		]

		if (new RegExp(deleteCommands.join('|')).test(string)) {
			return 'delete'
		} else if (new RegExp(boldCommands.join('|')).test(string)) {
			return 'bold'
		} else if (new RegExp(italicizeCommands.join('|')).test(string)) {
			return 'italicize'
		} else if (new RegExp(addRecipientCommands.join('|')).test(string)) {
			if (luisData && luisData.prediction.topIntent != 'Email.AddRecipient') {
				return 'add'
			}
		} else {
			return null
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
