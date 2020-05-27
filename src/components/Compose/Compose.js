import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import header from '../../assets/compose-header.png'

const Compose = ({ data }) => {
	let [ names, setNames ] = useState(data.luisData.prediction.entities['Email.ContactName'])
	let [ bodyText, setBodyText ] = useState('')
	let [ subjectText, setSubjectText ] = useState('')

	function renderNames() {
		return names.map((name, i) => {
			let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
			return <Name key={ 'name' + i }>{ capitalizedName }</Name>
		})
	}

	function handleBodyTextChange(event) {
		setBodyText(event.target.value)
	}

	function handleSubjectTextChange(event) {
		setSubjectText(event.target.value)
	}

	return (
		<Container>
			<Header>
				<img src={ header } />
			</Header>
			<To>
				<Label>To:</Label>
				<Names>{ names && renderNames() }</Names>				
			</To>
			<Subject>
				<Label>Subject:</Label>
				<input type="text" value={ subjectText } onChange={ handleSubjectTextChange } />
			</Subject>
			<Body>
				<BodyText 
					value={ bodyText } 
					onChange={ handleBodyTextChange } />
			</Body>
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

const Body = styled.div`
	flex: 1;
	width: 100%;
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
`

const BodyText = styled.textarea`
	width: 100%;
	height: 100%;
	padding: 12px;
	font-size: 15px;
	color: #333;
	outline: none;
	border: 0;
`