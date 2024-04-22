import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'

interface IProps {
  id: UniqueIdentifier
}

const Droppable = ({ id, children }: PropsWithChildren<IProps>) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}

export default Droppable
