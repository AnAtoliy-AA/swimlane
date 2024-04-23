import styled from 'styled-components'
import SettingsBlock from './components/SettingsBlock'
import LinesWrapper from './components/lines/LinesWrapper'
import { AllProviders } from './providers/allProviders'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

function App() {
  return (
    <AllProviders>
      <AppWrapper>
        <h1>Swimlane UI</h1>
        <SettingsBlock />
        <LinesWrapper />
      </AppWrapper>
    </AllProviders>
  )
}

export default App
