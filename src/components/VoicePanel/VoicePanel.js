import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'
import Panel from './Panel'
import Compose from '../Compose/Compose'

const VoicePanel = ({ data }) => {
	let [ startExit, setStartExit ] = useState(false)
	let { recognizerStop,	showPanel, showCompose } = data

	useEffect(() => {
		console.log(data.utterance)
	}, [ showPanel ])

	return ( data && 
		<Container>
			<Overlay
				recognizerStop={ recognizerStop }
				startExit={ startExit }
				setStartExit={ setStartExit } />
			{ showCompose && <Compose data={ data } /> }
			<Panel 
				startExit={ startExit }
				data={ data } />
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
