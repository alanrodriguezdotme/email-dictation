import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'
import Panel from './Panel'

const VoicePanel = ({ showPanel, handleMicClick, utterance, recognizerStop }) => {
	let [ startExit, setStartExit ] = useState(false)

	useEffect(() => {

	}, [ showPanel ])

	return (
		<Container>
			<Overlay
				recognizerStop={ recognizerStop }
				startExit={ startExit }
				setStartExit={ setStartExit } />
			<Panel 
				startExit={ startExit }
				utterance={ utterance }
				handleMicClick={ handleMicClick } />
		</Container>
	)
}

export default VoicePanel

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 100;
`
