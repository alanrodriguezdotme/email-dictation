import React, { useState } from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'
import Panel from './Panel'
import Compose from '../Compose/Compose'

const VoicePanel = ({ data }) => {
	let [ startExit, setStartExit ] = useState(false)
	let { showCompose } = data

	return ( data && 
		<Container>
			<Overlay
				data={ data }
				startExit={ startExit }
				setStartExit={ setStartExit } />
			{ showCompose && 
			  // data.luisData && 
				<Compose data={ data } /> }
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
