import { LINE_ITEM_ID_SEPARATOR } from '@/components/dnd/Draggable'
import { TNodeItems } from '@/components/lines/LinesWrapper'
import { ID } from '@/types/INodeItem'

interface IOpts {
  items: TNodeItems
  itemId?: ID
  destinationId?: ID
}

const moveItem = ({ items, itemId, destinationId }: IOpts): TNodeItems => {
  if (!itemId || !destinationId) return items

  const [lineId, moveItemId] = String(itemId).split(LINE_ITEM_ID_SEPARATOR)

  const copyItems = structuredClone(items)

  const oldItem = copyItems
    .get(lineId)
    ?.find((removedItem) => removedItem.id === moveItemId)

  if (oldItem) {
    const arrayWithoutItem =
      copyItems
        .get(lineId)
        ?.filter((removedItem) => removedItem.id !== moveItemId) || []

    copyItems.set(lineId, arrayWithoutItem)

    const destinationArray = copyItems.get(destinationId) || []
    const editedItem = {
      ...oldItem,
      position: { lineId: destinationId, index: 1 },
    }

    copyItems.set(destinationId, [...destinationArray, editedItem])
  }

  return copyItems
}

export default moveItem
