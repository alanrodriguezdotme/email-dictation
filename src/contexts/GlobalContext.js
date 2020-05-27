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

	const resetVoice = () => {
		setCortanaText("What do you want to do today?")
		setUtterance(null)
		setAvatarState(null)
		setSttState(null)
		setLuisData(null)
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
			resetVoice
		}}>
			{ props.children }
		</GlobalContext.Provider>
	)
}

export default GlobalContextProvider