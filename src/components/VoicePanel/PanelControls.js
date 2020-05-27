import React from 'react'
import styled from 'styled-components'

const PanelControls = ({ handleMicClick }) => {

	function renderMicButton() {
		return (
			<Mic onClick={ () => handleMicClick() }>
				<OuterCircle></OuterCircle>
				<InnerCircle>
					<i className="icon icon-HololensMic" />
				</InnerCircle>
			</Mic>
		)
	}

	return (
		<Container>
			<Button>
				<i className="icon icon-WhatsThis" />
			</Button>
			{ renderMicButton() }
			<Button>
				<i className="icon icon-KeyboardClassic" />
			</Button>
		</Container>
	)
}

export default PanelControls

const Container = styled.div`
	color: #919191;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 70px;
	margin: 12px 0 20px;
`

const Button = styled.div`
	width: 33%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
`

const Mic = styled.div`
	position: relative;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`

const OuterCircle = styled.div`
	position: absolute;
	z-index: 1;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.08);
`

const InnerCircle = styled.div`
	position: relative;
	z-index: 2;
	width: 52px;
	height: 52px;
	background-color: #0078d4;
	border-radius: 26px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;

	i {
		font-size: 24px;
	}
`