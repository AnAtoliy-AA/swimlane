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

  return <button onClick={handleClick}>Add new</button>
}

export default AddComponent
