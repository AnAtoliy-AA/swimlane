import mockItems, { TNodeItems, mockLines } from '@/constants/mocks'
import { v4 as uuidv4 } from 'uuid'
import { ILine } from '@/types/ILine'
import { create } from 'zustand'
import { ID } from '@/types/INodeItem'
import { IMoveItemsOpts, addItem, moveItem, removeItem } from '@/utils/moveItem'

export interface ItemsState {
  lines: Array<ILine>
  nodeItems: TNodeItems
  addLine: VoidFunction
  removeLine: (id: ID) => void
  moveItems: (opts: Omit<IMoveItemsOpts, 'items'>) => void
  addItems: (lineId: ID) => void
  removeItems: (itemId: ID, lineId: ID) => void
}

const useItemsStore = create<ItemsState>((set) => ({
  lines: mockLines,
  nodeItems: mockItems,
  addLine: () =>
    set((state: ItemsState) => ({
      lines: [...state.lines, { id: uuidv4(), name: '' }],
    })),
  removeLine: (id: ID) =>
    set((state: ItemsState) => ({
      lines: state.lines.filter((line) => line.id !== id),
    })),
  moveItems: ({
    itemId,
    lineId,
    destinationId,
    deltaY,
  }: Omit<IMoveItemsOpts, 'items'>) =>
    set((state: ItemsState) => ({
      nodeItems: moveItem({
        items: state.nodeItems,
        itemId,
        lineId,
        destinationId,
        deltaY,
      }),
    })),
  addItems: (lineId: ID) =>
    set((state: ItemsState) => ({
      nodeItems: addItem({ lineId, items: state.nodeItems }),
    })),

  removeItems: (itemId: ID, lineId: ID) =>
    set((state: ItemsState) => ({
      nodeItems: removeItem({ lineId, items: state.nodeItems, itemId }),
    })),
}))

export default useItemsStore
