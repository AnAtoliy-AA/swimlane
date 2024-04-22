import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { PropsWithChildren } from 'react'

interface IProps {
  id: UniqueIdentifier
  lineId?: UniqueIdentifier
}

export const LINE_ITEM_ID_SEPARATOR = '-->'

const Draggable = ({ id, lineId, children }: PropsWithChildren<IProps>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: lineId ? `${lineId}${LINE_ITEM_ID_SEPARATOR}${id}` : id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

export default Draggable
