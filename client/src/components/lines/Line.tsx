import { ILine } from '@/types/ILine'
import { INodeItem } from '@/types/INodeItem'
import { useCallback } from 'react'
import NodeItem from '../NodeItem'

interface IProps {
  line: ILine
  items?: Array<INodeItem>
  remove?: (id: number | string) => void
}

const Line = ({ line, items, remove }: IProps) => {
  const handleRemove = useCallback(() => {
    if (remove) {
      remove(line.id)
    }
  }, [line.id, remove])

  return (
    <>
      <p>{line.name}</p>
      {items?.map((nodeItem: INodeItem) => {
        return <NodeItem nodeItem={nodeItem} />
      })}
      <p onClick={handleRemove}>X</p>
    </>
  )
}

export default Line
