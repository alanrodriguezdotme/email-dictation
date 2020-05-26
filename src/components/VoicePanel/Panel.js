import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import PanelTips from './PanelTips'
import PanelControls from './PanelControls'

const Panel = ({ startExit, handleMicClick }) => {
	useEffect(() => {
		handleMicClick()
	}, [])

	return (
		<Container className={ startExit && 'off' }>
			<Handle>
				<div className="pill" />
			</Handle>
			<Content>
				<Title></Title>
				<Utterance></Utterance>
			</Content>
			<PanelTips />
			<PanelControls />
		</Container>
	)
}

export default Panel

const animateIn = keyframes`
	0% { transform: translateY(285px); }
	100% { transform: translateY(0); }
`

const animateOut = keyframes`
	0% { transform: translateY(0); }
	100% { transform: translateY(285px); }
`

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 285px;
	border-radius: 14px 14px 0 0;
	background-color: #fff;
	bottom: 0;
	z-index: 2;
	box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.8);
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
`

const Title = styled.div`

`

const Utterance = styled.div`

`