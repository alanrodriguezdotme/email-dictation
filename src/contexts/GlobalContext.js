import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
	let [ sttState, setSttState ] = useState(null)
	let [ avatarState, setAvatarState ] = useState(null)
	let [ utterance, setUtterance ] = useState(null)
	let [ currentTab, setCurrentTab ] = useState('search')
	let [ showPanel, setShowPanel ] = useState(true)

	return (
		<GlobalContext.Provider value={{
			sttState, setSttState,
			avatarState, setAvatarState,
			utterance, setUtterance,
			currentTab, setCurrentTab,
			showPanel, setShowPanel
		}}>
			{ props.children }
		</GlobalContext.Provider>
	)
}

export default GlobalContextProvider