import { RemoveSVG } from '@/assets/RemoveSVG'
import useSettingsStore from '@/store/settingsStore'
import { useCallback } from 'react'

interface IProps {
  remove?: VoidFunction
}

const RemoveComponent = ({ remove }: IProps) => {
  const { isEditionBlocked } = useSettingsStore()
  const handleClick = useCallback(() => {
    if (remove && !isEditionBlocked) {
      remove()
    }
  }, [isEditionBlocked, remove])

  return (
    <button onClick={handleClick}>
      <RemoveSVG />
    </button>
  )
}

export default RemoveComponent
