import React, { useContext } from 'react'
import styled from 'styled-components'

import searchHeader from '../../assets/search-header.png'
import { GlobalContext } from '../../contexts/GlobalContext'

const SearchHeader = () => {
	let { setShowPanel } = useContext(GlobalContext)

	return (
		<Container>
			<img onClick={ () => { setShowPanel(true) } } src={ searchHeader } alt="search-header" />
		</Container>
	)
}

export default SearchHeader

const Container = styled.div`
	height: 140px;
	width: 100%;
	background-color: #0078d4;

	img { 
		width: 100%;
	}
`
