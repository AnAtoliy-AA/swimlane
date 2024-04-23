import useSettingsStore from '@/store/settingsStore'
import Checkbox from './styled/Checkbox'
import { SettingsSVG } from '@/assets/SettingsSVG'
import { ModalContainer } from './styled/Modal/ModalContainer'
import styled from 'styled-components'

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  padding: 20px;
  z-index: 200;
`

const SettingsBlock = () => {
  const {
    isModalOpen,
    isHorizontal,
    isEditionBlocked,
    toggleIsModalOpen,
    toggleIsHorizontal,
    toggleIsEditionBlocked,
  } = useSettingsStore()

  return (
    <>
      <button onClick={toggleIsModalOpen}>
        <SettingsSVG />
      </button>

      <ModalContainer isModalShown={isModalOpen} onClick={toggleIsModalOpen}>
        <SettingsWrapper>
          <h2>Settings</h2>
          <Checkbox
            checked={isHorizontal}
            label='Show horizontal?'
            onChange={toggleIsHorizontal}
          />
          <Checkbox
            checked={isEditionBlocked}
            label='Block all edition'
            onChange={toggleIsEditionBlocked}
          />
        </SettingsWrapper>
      </ModalContainer>
    </>
  )
}

export default SettingsBlock
