import styled from 'styled-components'
import FilterBlock from './FilterBlock'
import SettingsBlock from './SettingsBlock'

const ControlPanel = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 20px;
  margin-right: 70px;
`

const Header = () => {
  return (
    <>
      <h1>Swimlane UI</h1>
      <ControlPanel>
        <FilterBlock />
        <SettingsBlock />
      </ControlPanel>
    </>
  )
}

export default Header
