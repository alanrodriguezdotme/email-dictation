import React, { useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { GlobalContext } from '../../contexts/GlobalContext'

const Overlay = ({ startExit, setStartExit, recognizerStop }) => {
	let { setShowPanel } = useContext(GlobalContext)

	function handleOverlayClick() {
		recognizerStop()
		setStartExit(true)
		setTimeout(() => {
			setShowPanel(false)
		}, 400)
	}
	
	return (
		<Container 
			className={ startExit && 'off' }
			onClick={() => handleOverlayClick() }>
		</Container>
	)
}

export default Overlay

const animateIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`

const animateOut = keyframes`
	0% { opacity: 1; }
	100% { opacity: 0; }
`

const Container = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.77);
	z-index: 1;
	animation: ${ animateIn } 350ms cubic-bezier(0.16, 1, 0.3, 1);
	animation-fill-mode: forwards;
	opacity: 1;
	transition: opacity 350ms cubic-bezier(0.16, 1, 0.3, 1);

	&.off {
		animation: ${ animateOut } 400ms cubic-bezier(0.16, 1, 0.3, 1);
		animation-fill-mode: forwards;
	}
`
