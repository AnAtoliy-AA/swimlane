import styled from 'styled-components'
import LinesWrapper from './components/lines/LinesWrapper'
import { AllProviders } from './providers/allProviders'
import Header from './components/Header'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`

function App() {
  return (
    <AllProviders>
      <AppWrapper>
        <Header />
        <LinesWrapper />
      </AppWrapper>
    </AllProviders>
  )
}

export default App
