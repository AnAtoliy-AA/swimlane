import { useCallback } from 'react'

interface IProps {
  cb?: VoidFunction
}

const AddComponent = ({ cb }: IProps) => {
  const handleClick = useCallback(() => {
    if (cb) {
      cb()
    }
  }, [cb])

  return <div onClick={handleClick}>+</div>
}

export default AddComponent
