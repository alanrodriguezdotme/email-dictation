import React from 'react';
import GlobalContextProvider from './contexts/GlobalContext';
import Wrapper from './components/Wrapper';
import SpeechToTextContextProvider from './contexts/SpeechToTextContext';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <SpeechToTextContextProvider>
          <Wrapper />
        </SpeechToTextContextProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
