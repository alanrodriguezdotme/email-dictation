import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Inbox from './Inbox/Inbox'
import Tabs from './Tabs'
import { GlobalContext } from '../contexts/GlobalContext'
import Search from './Search/Search'
import VoicePanel from './VoicePanel/VoicePanel'
import { SpeechToTextContext } from '../contexts/SpeechToTextContext'

const Wrapper = () => {
	let { currentTab, showPanel } = useContext(GlobalContext)
	let { initStt, handleMicClick } = useContext(SpeechToTextContext)

	useEffect(() => {
		initStt()
	}, [])

	function renderView() {
		switch(currentTab) {
			case 'inbox':
				return <Inbox />
			case 'search':
				return <Search />
			default:
				return <Inbox />
		}
	}

	return (
		<Container>
			<Viewport>
				{ showPanel && 
					<VoicePanel 
						handleMicClick={ handleMicClick } 
						showPanel={ showPanel } /> }
				{ renderView() }
				<Tabs currentTab={ currentTab } />
			</Viewport>
		</Container>
	)
}

export default Wrapper

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: #333;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Viewport = styled.div`
	width: 375px;
	height: 812px;
	background: #fff;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;
`
