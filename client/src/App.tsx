import LinesWrapper from './components/lines/LinesWrapper'
import { AllProviders } from './providers/allProviders'

function App() {
  return (
    <AllProviders>
      <LinesWrapper />
    </AllProviders>
  )
}

export default App
