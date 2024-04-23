import { RemoveSVG } from '@/assets/RemoveSVG'
import { useCallback } from 'react'

interface IProps {
  remove?: VoidFunction
}

const RemoveComponent = ({ remove }: IProps) => {
  const handleClick = useCallback(() => {
    if (remove) {
      remove()
    }
  }, [remove])

  return (
    <button onClick={handleClick}>
      <RemoveSVG />
    </button>
  )
}

export default RemoveComponent
