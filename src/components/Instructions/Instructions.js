import React, { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../contexts/GlobalContext'

const Instructions = () => {
	let { setShowInstructions } = useContext(GlobalContext)

	function handleButtonClick() {
		setShowInstructions(false)
	}

	return (
		<Container>
			<Content>
				<Header>					
					<Button onClick={ () => handleButtonClick() }>
						<i className="icon icon-Cancel" />
					</Button>
				</Header>
				<h1>Outlook Email Dictation Prototype</h1>
				<h2>What you can do:</h2>
				<ul>
					<li>Tap anywhere in the blue header</li>
					<li>Say <strong>"send a message to [insert name]"</strong></li>
					<li>This opens an email compose screen, where you can start dictating a message."</li>
					<li>While dictating, you can say the following:
						<ul>
							<li><strong>"bold that"</strong></li>
							<li><strong>"italicize" or "italics"</strong></li>
							<li><strong>"delete"</strong></li>
							<li><strong>"Add [insert name here]"</strong></li>
						</ul>
					</li>
				</ul>
			</Content>
		</Container>
	)
}

export default Instructions

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.9);
`

const Content = styled.div`
	width: 100%;
	height: 100%;
	padding: 12px;
	color: white;
	display: flex;
	flex-direction: column;

	h1 {
		margin: 0;
	}

	ul {
		margin: 0;
		padding-left: 20px;
	}

	li {
		padding: 8px 0;
	}
`

const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`

const Button = styled.div`
	padding: 12px;
	width: 48px;
	height: 48px;
	cursor: pointer;
	
	i {
		font-size: 24px;
	}
`