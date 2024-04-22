import useSettingsStore from '@/store/settingsStore'
import Checkbox from './styled/Checkbox'

const SettingsBlock = () => {
  const { isHorizontal, toggleIsHorizontal } = useSettingsStore()
  return (
    <>
      <Checkbox
        checked={isHorizontal}
        label='Show horizontal?'
        onChange={toggleIsHorizontal}
      />
    </>
  )
}
export default SettingsBlock
