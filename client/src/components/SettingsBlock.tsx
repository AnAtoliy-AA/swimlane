import useSettingsStore from '@/store/settingsStore'
import Checkbox from './styled/Checkbox'
import { SettingsSVG } from '@/assets/SettingsSVG'
import { ModalContainer } from './styled/Modal/ModalContainer'
import styled from 'styled-components'

export const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  z-index: 200;
`

const SettingsBlock = () => {
  const { isModalOpen, isHorizontal, toggleIsModalOpen, toggleIsHorizontal } =
    useSettingsStore()

  return (
    <>
      <button onClick={toggleIsModalOpen}>
        <SettingsSVG />
      </button>

      <ModalContainer isModalShown={isModalOpen} onClick={toggleIsModalOpen}>
        <SettingsWrapper>
          <Checkbox
            checked={isHorizontal}
            label='Show horizontal?'
            onChange={toggleIsHorizontal}
          />
        </SettingsWrapper>
      </ModalContainer>
    </>
  )
}

export default SettingsBlock
