import useSettingsStore from '@/store/settingsStore'
import { useCallback } from 'react'

interface IProps {
  add?: VoidFunction
}

const AddComponent = ({ add }: IProps) => {
  const { isEditionBlocked } = useSettingsStore()
  const handleClick = useCallback(() => {
    if (add && !isEditionBlocked) {
      add()
    }
  }, [add, isEditionBlocked])

  return (
    <button onClick={handleClick} aria-label='Add new'>
      Add new
    </button>
  )
}

export default AddComponent
