import React, { useEffect, useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import PanelTips from './PanelTips'
import PanelControls from './PanelControls'

const Panel = ({ data, startExit }) => {
	let { startListening, utterance, cortanaText, heardCommandText, recognizerStop, sttState, focus } = data

	useEffect(() => {
		startListening(data, false, false)
	}, [])

	useEffect(() => {
		console.log(utterance)
	}, [ utterance ])

	function renderContent() {
		if (heardCommandText) {
			return <Command>{ heardCommandText }</Command>
		} else if (utterance && utterance.length > 0) { 
			return <Utterance>{ utterance }</Utterance> 
		} else if (cortanaText) { 
			return <CortanaText>{ cortanaText }</CortanaText> 
		}	else { 
			return <PanelTips /> 
		}
	}

	return (
		<Container className={ startExit && 'off' }>
			<Handle>
				<div className="pill" />
			</Handle>
			<Content>
				{ renderContent() }
			</Content>
			<PanelControls 
				data={ data } />
		</Container>
	)
}

export default Panel

const animateIn = keyframes`
	0% { transform: translateY(200px); }
	100% { transform: translateY(0); }
`

const animateOut = keyframes`
	0% { transform: translateY(0); }
	100% { transform: translateY(200px); }
`

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 200px;
	border-radius: 14px 14px 0 0;
	background-color: #fff;
	bottom: 0;
	z-index: 100;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.14);
	display: flex;
	flex-direction: column;
	transition: height 275ms cubic-bezier(0.16, 1, 0.3, 1);
	animation: ${ animateIn } 350ms cubic-bezier(0.16, 1, 0.3, 1);
	animation-fill-mode: forwards;

	&.off {
		animation: ${ animateOut } 300ms cubic-bezier(0.16, 1, 0.3, 1);
		animation-fill-mode: forwards;
	}
`

const Handle = styled.div`
	height: 20px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	.pill {
		width: 36px;
		height: 4px;
		border-radius: 2px;
		background-color: #e1e1e1;
	}
`

const Content = styled.div`
	display: flex; 
	flex-direction: column;
	flex: 1;
	/* align-items: center; */
	justify-content: flex-end;
`

const Utterance = styled.div`
	width: 100%;
	text-align: center;
	padding: 12px;
`

const CortanaText = styled.div`
	width: 100%;
	text-align: center;
	padding: 12px;
	font-weight: bold;
`

const Command = styled.div`
	width: 100%;
	text-align: center;
	padding: 12px;
	
	.heardCommand {
		/* font-weight: bold; */
		color: #0078d4;
	}
`