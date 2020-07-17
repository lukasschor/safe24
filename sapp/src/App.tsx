
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button, Card, Icon, Title, Text } from '@gnosis.pm/safe-react-components';
import TextField from '@material-ui/core/TextField';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import './App.css';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

const App = () => {
  const [activeScreen, setActiveScreen] = useState(0)
  const switchScreen = useCallback(() => {
    setActiveScreen((activeScreen + 1) % 2)
  }, [activeScreen])
  const safe = useSafe()
  return (
    <>
      {(activeScreen == 0) ? (
        <Screen1 action={switchScreen} />
      ) : (
          <Screen2 action={switchScreen} />
        )
      }
    </>)
}

export default App
