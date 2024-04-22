import { useCallback } from 'react'

interface IProps {
  add?: VoidFunction
}

const AddComponent = ({ add }: IProps) => {
  const handleClick = useCallback(() => {
    if (add) {
      add()
    }
  }, [add])

  return <div onClick={handleClick}>+</div>
}

export default AddComponent
