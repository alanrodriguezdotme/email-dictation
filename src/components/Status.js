import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const Status = ({ showStatus, setShowStatus }) => {
	let [ shouldHide, setShouldHide ] = useState(false)
	useEffect(() => {
		setTimeout(() => {
			setShouldHide(true)

			setTimeout(() => {
				setShowStatus(false)
			}, 500)
		}, 3000)
	}, [])

	return (
		<Container className={ shouldHide && 'hide' }>
			Mail sent.
		</Container>
	)
}

export default Status

const animateIn = keyframes`
	0% { 
		transform: translateY(0);
	}
	100% {
		transform: translateY(-50px);
	}
`

const animateOut = keyframes`
	0% { 
		transform: translateY(-50px);
	}
	100% {
		transform: translateY(0);
	}
`

const Container = styled.div`
	width: 100%;
	height: 50px;
	position: absolute;
	bottom: 0;
	background: #fff;
	color: #0078d4;
	animation: ${ animateIn } 475ms cubic-bezier(0.16, 1, 0.3, 1);
	border-top: 1px solid rgb(237, 237, 237);
	border-bottom: 1px solid rgb(237, 237, 237);
	display: flex;
	align-items: center;
	justify-content: center;
	animation-fill-mode: forwards;

	&.hide {
		animation: ${ animateOut } 475ms cubic-bezier(0.16, 1, 0.3, 1);
	}
`
