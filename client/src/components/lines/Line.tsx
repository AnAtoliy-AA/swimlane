import { ILine } from '@/types/ILine'
import { useCallback } from 'react'

interface IProps {
  line: ILine
  remove?: (id: number | string) => void
}

const Line = ({ line, remove }: IProps) => {
  const handleRemove = useCallback(() => {
    if (remove) {
      remove(line.id)
    }
  }, [line.id, remove])

  return (
    <>
      <p>{line.name}</p>
      <p onClick={handleRemove}>X</p>
    </>
  )
}

export default Line
