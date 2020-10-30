import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
	let [ sttState, setSttState ] = useState(null)
	let [ avatarState, setAvatarState ] = useState(null)
	let [ utterance, setUtterance ] = useState(null)
	let [ currentTab, setCurrentTab ] = useState('search')
	let [ showPanel, setShowPanel ] = useState(false)
	let [ cortanaText, setCortanaText ] = useState("What do you want to do?")
	let [ luisData, setLuisData ] = useState(null)
	let [ showCompose, setShowCompose ] = useState(false)
	let [ focus, setFocus ] = useState(null)
	let [ recipients, setRecipients ] = useState([])
	let [ heardCommandText, setHeardCommandText ] = useState(null)
	let [ showStatus, setShowStatus ] = useState(true)
	let [ showInstructions, setShowInstructions ] = useState(true)
	let [ sandboxUtterance, setSandboxUtterance ] = useState([])
	
	const resetVoice = () => {
		setCortanaText(null)
		setUtterance(null)
		setAvatarState(null)
		setSttState(null)
		setLuisData(null)
		setHeardCommandText(null)
	}

	const debounce = (func, wait, immediate) => {
		let timeout;
		return function () {
			const context = this
			const args = arguments
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args)
			}
			const callNow = immediate && !timeout
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
			if (callNow) func.apply(context, args)
		}
	}

	return (
		<GlobalContext.Provider value={{
			sttState, setSttState,
			avatarState, setAvatarState,
			utterance, setUtterance,
			currentTab, setCurrentTab,
			showPanel, setShowPanel,
			cortanaText, setCortanaText,
			luisData, setLuisData,
			showCompose, setShowCompose,
			focus, setFocus,
			recipients, setRecipients,
			heardCommandText, setHeardCommandText,
			showStatus, setShowStatus,
			showInstructions, setShowInstructions,
			sandboxUtterance, setSandboxUtterance,
			resetVoice,
			debounce
		}}>
			{ props.children }
		</GlobalContext.Provider>
	)
}

export default GlobalContextProvider