import useSettingsStore from '@/store/settingsStore'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { PropsWithChildren } from 'react'

interface IProps {
  id: UniqueIdentifier
  lineId?: UniqueIdentifier
}

const Draggable = ({ id, lineId, children }: PropsWithChildren<IProps>) => {
  const { isEditionBlocked } = useSettingsStore()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isEditionBlocked,
    data: {
      lineId,
      id,
    },
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
