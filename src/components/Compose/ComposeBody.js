import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

const ComposeBody = ({ data }) => {
	const { setFocus, setCortanaText, focus, utterance } = data
	const bodyRef = useRef(null)
	let [ bodyText, setBodyText ] = useState('')

	useEffect(() => {
		console.log()
	}, [bodyRef])

	useEffect(() => {
		console.log(focus, utterance)
		if (focus === 'body' && utterance) {
			setBodyText(bodyText + ' ' + utterance)
		}
	}, [utterance])

	function handleFocus() {
		setFocus('body')
		setCortanaText("What's your message?")
	}

	function handleBodyTextChange(event) {
		setBodyText(event.target.value)
	}

	return (
		<Container>
			<textarea 
				ref={ bodyRef }
				value={ bodyText }
				onChange={ handleBodyTextChange }
				onFocus={ () => handleFocus() } />
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
