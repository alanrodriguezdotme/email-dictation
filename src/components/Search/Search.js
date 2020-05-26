import React from 'react'
import styled from 'styled-components'

import SearchHeader from './SearchHeader'
import list from '../../assets/search-list.png'

const Search = () => {
	return (
		<Container>
			<SearchHeader />
			<SearchList>
				<img src={ list } alt="search-header" />
			</SearchList>
		</Container>
	)
}

export default Search

const Container = styled.div`
	width: 100%;
	height: calc(100% - 83px);
	display: flex;
	flex-direction: column;
	flex: 1;	
`

const SearchList = styled.div`
	flex: 1;
	width: 100%;
	padding-top: 20px;

	img {
		width: 100%;
	}
`