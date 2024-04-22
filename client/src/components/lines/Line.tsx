import { ILine } from '@/types/ILine'
import { INodeItem } from '@/types/INodeItem'
import { useCallback } from 'react'
import NodeItem from '../NodeItem'
import Droppable from '../dnd/Droppable'

interface IProps {
  line: ILine
  items?: Array<INodeItem>
  remove?: (id: number | string) => void
}

const Line = ({ line, items, remove }: IProps) => {
  const { id, name } = line

  const handleRemove = useCallback(() => {
    if (remove) {
      remove(id)
    }
  }, [id, remove])

  return (
    <Droppable id={id}>
      <p>{name}</p>
      {items?.map((nodeItem: INodeItem) => {
        return <NodeItem key={nodeItem.id} nodeItem={nodeItem} lineId={id} />
      })}
      <p onClick={handleRemove}>X</p>
    </Droppable>
  )
}

export default Line
