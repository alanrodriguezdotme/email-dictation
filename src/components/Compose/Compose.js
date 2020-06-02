import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import header from '../../assets/compose-header.png'
import ComposeBody from './ComposeBody'

const Compose = ({ data }) => {
	let { setFocus, focus, setCortanaText, sttState, utterance, recipients } = data
	let [ subjectText, setSubjectText ] = useState('')
	let [ toText, setToText ] = useState('')
	let [ recipientNames, setRecipientNames ] = useState([])

	useEffect(() => {
		let newRecipientNames = recipientNames.concat(recipients)
		setRecipientNames(newRecipientNames)
	}, [recipients])

	useEffect(() => {		
		if (sttState != null && utterance != null && focus === 'subject') {
			let scrubbedUtterance = utterance.charAt(0).toUpperCase() + utterance.slice(1)
			setSubjectText(scrubbedUtterance)
		}
	}, [sttState, utterance])

	function renderNames(names) {
		let surnames = ['Carson', 'Patel', 'Santos', 'Larsson', 'Ngyuen', 'Darling', 'Baskins']
		console.log(names)
		return names.map((name, i) => {
			if (name.indexOf(' ') >= 0) {
				return <Name key={ 'name' + i }>{ capitalize(name) }</Name>
			} else {
				return <Name key={ 'name' + i }>{ capitalize(name) + ' ' + surnames[i] }</Name>
			}
		})
	}

	function capitalize(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	function handleSubjectTextChange(event) {
		setSubjectText(event.target.value)
	}

	function handleToTextChange(event) {
		setToText(event.target.value)
	}

	function handleToFocus(event) {
		setFocus('to')
		setCortanaText('Who is this for?')
	}

	function handleSubjectFocus(event) {
		setFocus('subject')
		setCortanaText('Who is this about?')
	}

	return (
		<Container>
			<Header>
				<img src={ header } />
			</Header>
			<To>
				<Label>To:</Label>
				{ recipientNames && <Names>{ renderNames(recipientNames) }</Names>	}
				<input type="text" 
					value={ toText } 
					onChange={ handleToTextChange }
					onFocus={ handleToFocus }  />
			</To>
			<Subject>
				<Label>Subject:</Label>
				<input type="text" 
					value={ subjectText } 
					onChange={ handleSubjectTextChange }
					onFocus={ handleSubjectFocus } />
			</Subject>
			<ComposeBody data={ data } />
		</Container>
	)
}

export default Compose

const animateIn = keyframes`
	0% { transform: translateY(calc(100% - 40px)); }
	100% { transform: translateY(0); }
`

const Container = styled.div`
	width: 100%;
	height: calc(100% - 40px);
	border-radius: 14px;
	background: #fff;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.14);
	position: absolute;
	bottom: 0;
	z-index: 2;
	animation: ${ animateIn } 350ms cubic-bezier(0.16, 1, 0.3, 1);
	display: flex;
	flex-direction: column;
`

const Header = styled.div`
	padding-top: 12px;

	img {
		width: 100%;
	}
`

const To = styled.div`
	display: flex;
	width: 100%;
	height: 44px;
	border-bottom: 1px solid #e1e1e1;

	input[type="text"] {
		border: 0;
		width: 100%;
		height: 100%;
		outline: none;
	}
`

const Subject = styled.div`
	display: flex;
	width: 100%;
	height: 44px;
	border-bottom: 1px solid #e1e1e1;

	input[type="text"] {
		border: 0;
		width: 100%;
		height: 100%;
		outline: none;
	}
`

const Label = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	padding: 0 12px;
	color: #6e6e6e;
	font-size: 15px;
`

const Names = styled.div`
	display: flex;
	align-items: center;
`

const Name = styled.div`
	padding: 2px 4px;
	background: rgb(248, 248, 248);
	color: #919191;
	margin-right: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 15px;
	border-radius: 3px;
	height: 22px;
	white-space: nowrap;
`