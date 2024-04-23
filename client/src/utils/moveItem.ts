import { LINE_ITEM_ID_SEPARATOR } from '@/components/dnd/Draggable'
import { TNodeItems } from '@/constants/mocks'
import { ID } from '@/types/INodeItem'

interface IOpts {
  items: TNodeItems
  itemId?: ID
  destinationId?: ID
  deltaY: number
}

export const ITEM_SIZE = 150
export const ITEMS_GAP = 40

export const getLineItemId = (id: ID) => {
  const [lineId, moveItemId] = String(id).split(LINE_ITEM_ID_SEPARATOR)

  return { lineId, moveItemId }
}

const moveItem = ({
  items,
  itemId,
  destinationId,
  deltaY,
}: IOpts): TNodeItems => {
  if (!itemId || !destinationId) return items

  const { lineId, moveItemId } = getLineItemId(itemId)

  const copyItems = structuredClone(items)

  const oldItem = copyItems
    .get(lineId)
    ?.find((removedItem) => removedItem.id === moveItemId)

  if (oldItem) {
    const arrayWithoutItem =
      copyItems.get(lineId)?.map((item) => {
        if (item.id !== moveItemId) return item

        return { id: '', position: oldItem.position, text: '' }
      }) || []

    copyItems.set(lineId, arrayWithoutItem)
    const destinationArray = copyItems.get(destinationId) || []

    const newItemIndex =
      oldItem.position.index + Math.round(deltaY / (ITEM_SIZE + ITEMS_GAP))

    const editedItem = {
      ...oldItem,
      position: { lineId: destinationId, index: newItemIndex },
    }

    const replacedItem = destinationArray.find(
      (item) => item.position.index === newItemIndex,
    )

    if (replacedItem?.text) {
      const updated = destinationArray.map((item) => {
        if (item.position.index > newItemIndex)
          return {
            ...item,
            position: {
              lineId: item.position.lineId,
              index: item.position.index + 1,
            },
          }
        return item
      })

      copyItems.set(
        destinationId,
        [...updated, editedItem].sort(
          (a, b) => a.position.index - b.position.index,
        ),
      )
    } else {
      const updated = destinationArray.map((item) => {
        if (item.position.index === newItemIndex) return editedItem

        return item
      })

      copyItems.set(
        destinationId,
        [...updated].sort((a, b) => a.position.index - b.position.index),
      )
    }
  }

  return copyItems
}

export default moveItem
