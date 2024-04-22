import SettingsBlock from './components/SettingsBlock'
import LinesWrapper from './components/lines/LinesWrapper'
import { AllProviders } from './providers/allProviders'

function App() {
  return (
    <AllProviders>
      <SettingsBlock />
      <LinesWrapper />
    </AllProviders>
  )
}

export default App
