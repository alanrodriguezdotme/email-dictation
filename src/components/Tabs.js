import React, { useContext } from 'react'
import styled from 'styled-components'

import { GlobalContext } from '../contexts/GlobalContext'
import mailSolid from '../assets/mail-solid.svg'
import mailOutline from '../assets/mail-outline.svg'
import searchSolid from '../assets/search-solid.svg'
import searchOutline from '../assets/search-outline.svg'
import calendarOutline from '../assets/calendar-outline.svg'


const Tabs = ({ currentTab }) => {
	let { setCurrentTab } = useContext(GlobalContext)

	return (
		<Container>
			<Tab onClick={ () => setCurrentTab('inbox') }>
				<img src={ currentTab === 'inbox' ? mailSolid : mailOutline } alt="inbox" />
			</Tab>
			<Tab onClick={ () => setCurrentTab('search') }>
				<img src={ currentTab === 'search' ? searchSolid : searchOutline } alt="search" />
			</Tab>
			<Tab>
				<img src={ calendarOutline } alt="calendar" />
			</Tab>
		</Container>
	)
}

export default Tabs

const Container = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	background: #f8f8f8;
	z-index: 3;
`

const Tab = styled.div`
	width: 33.333%;
	display: flex;
	align-items: center;
	justify-content: center;
	
	img {
		width: 22px;
	}
`
