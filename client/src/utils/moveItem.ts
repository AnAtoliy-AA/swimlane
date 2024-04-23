import { v4 as uuidv4 } from 'uuid'
import { TNodeItems } from '@/constants/mocks'
import { ID, TShape } from '@/types/INodeItem'
import { createNewDate } from './createNewDate'

export interface IAddItemsOpts {
  items: TNodeItems
  lineId: ID
}

export interface IRemoveItemsOpts extends IAddItemsOpts {
  itemId?: ID
}

export interface IMoveItemsOpts extends IRemoveItemsOpts {
  destinationId?: ID
  deltaY: number
}

export const ITEM_SIZE = 150
export const ITEMS_GAP = 40

//TODO refactor if/else tatements
export const moveItem = ({
  items,
  itemId,
  lineId,
  destinationId,
  deltaY,
}: IMoveItemsOpts): TNodeItems => {
  if (!itemId || !destinationId) return items

  const copyItems = structuredClone(items)

  const oldItem = copyItems
    .get(lineId)
    ?.find((removedItem) => removedItem.id === itemId)

  console.log('old', oldItem)

  if (oldItem) {
    const arrayWithoutItem =
      copyItems.get(lineId)?.map((item) => {
        if (item.id !== itemId) return item

        return {
          id: uuidv4(),
          position: oldItem.position,
          text: '',
          shape: 'rectangle' as TShape,
        }
      }) || []

    copyItems.set(lineId, arrayWithoutItem)
    const destinationArray = copyItems.get(destinationId) || []

    const newItemIndex =
      oldItem.position.index + Math.round(deltaY / (ITEM_SIZE + ITEMS_GAP))

    const editedItem = {
      ...oldItem,
      position: { lineId: destinationId, index: newItemIndex },
      changedAt: oldItem?.changedAt
        ? [...oldItem.changedAt, createNewDate()]
        : [createNewDate()],
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
      if (editedItem.position.index > destinationArray.length - 1) {
        copyItems.set(
          destinationId,
          [...destinationArray, editedItem].sort(
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
  }

  return copyItems
}

export const addItem = ({ items, lineId }: IAddItemsOpts) => {
  const copyItems = structuredClone(items)
  const destinationArray = copyItems.get(lineId) || []
  let lastItemIndex =
    destinationArray[destinationArray.length - 1]?.position?.index

  copyItems.set(
    lineId,
    [
      ...destinationArray,
      {
        id: uuidv4(),
        text: 'newItem',
        shape: 'rectangle' as TShape,
        position: {
          lineId,
          index: typeof lastItemIndex === 'number' ? lastItemIndex++ : 0,
        },
      },
    ].sort((a, b) => a.position.index - b.position.index),
  )

  return copyItems
}

export const removeItem = ({ items, lineId, itemId }: IRemoveItemsOpts) => {
  const copyItems = structuredClone(items)

  const oldItem = copyItems
    .get(lineId)
    ?.find((removedItem) => removedItem.id === itemId)

  if (oldItem) {
    const arrayWithoutItem =
      copyItems.get(lineId)?.map((item) => {
        if (item.id !== itemId) return item

        return {
          id: uuidv4(),
          position: oldItem.position,
          text: '',
          shape: 'rectangle' as TShape,
          createdAt: createNewDate(),
        }
      }) || []

    copyItems.set(lineId, arrayWithoutItem)
  }

  return copyItems
}
