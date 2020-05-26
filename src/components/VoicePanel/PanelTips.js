import React from 'react'
import styled from 'styled-components'

const Tips = [
	"Play my email",
	"What's my day look like?",
	"What's next?",
	"Send an email to Kat"
]

const PanelTips = () => {
	function renderTips() {
		return Tips.map((tip, i) => {
			return (
				<Tip key={ 'tip' + i }>{ tip }</Tip>
			)
		})
	}

	return (
		<Container>
			{ renderTips() }
		</Container>
	)
}

export default PanelTips

const Container = styled.div`
	display: flex;
	align-items: center;
	overflow-y: hidden;
	height: 36px;
	padding: 8px;

	&::-webkit-scrollbar {
		height: 0;
		background: transparent;
	}
`

const Tip = styled.div`
	font-size: 15px;
	color: #676767;
	padding: 4px 12px;
	height: 36px;
	border: 1px solid #eaeaea;
	border-radius: 18px 18px 0 18px;
	margin-right: 8px;
	white-space: nowrap;
	display: flex;
	align-items: center;
`