import React from 'react'
import styled from 'styled-components'

import header from '../../assets/header.png'
import list from '../../assets/inbox-list.png'

const Inbox = () => {
	return (
		<Container>
			<Header>
				<img src={ header } alt="inbox-header" />
			</Header>
			<List>
				<img src={ list } alt="list" />
			</List>
		</Container>
	)
}

export default Inbox

const Container = styled.div`
	width: 100%;
	height: calc(100% - 83px);
	display: flex;
	flex-direction: column;
	flex: 1;
`

const Header = styled.div`
	height: 140px;
	width: 100%;
	
	img {
		height: 100%;
	}
`

const List = styled.div`
	flex: 1;
	overflow-y: auto;

	img {
		width: 100%;
	}
`