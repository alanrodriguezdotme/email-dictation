import React from 'react';
import GlobalContextProvider from './contexts/GlobalContext';
import Wrapper from './components/Wrapper';
import SpeechToTextContextProvider from './contexts/SpeechToTextContext';
import LuisContextProvider from './contexts/LuisContext';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <SpeechToTextContextProvider>
          <LuisContextProvider>
            <Wrapper />
          </LuisContextProvider>
        </SpeechToTextContextProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
