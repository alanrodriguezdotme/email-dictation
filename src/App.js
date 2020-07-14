import React from 'react';
import GlobalContextProvider from './contexts/GlobalContext';
import Wrapper from './components/Wrapper';
import LuisContextProvider from './contexts/LuisContext';
import STTContextProvider from './contexts/STTContext';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <STTContextProvider>
          <LuisContextProvider>
            <Wrapper />
          </LuisContextProvider>
        </STTContextProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
