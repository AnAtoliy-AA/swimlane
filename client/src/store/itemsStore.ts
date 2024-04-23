import mockItems, { TNodeItems, mockLines } from '@/constants/mocks'
import { v4 as uuidv4 } from 'uuid'
import { ILine } from '@/types/ILine'
import { create } from 'zustand'
import { ID } from '@/types/INodeItem'

export interface ItemsState {
  lines: Array<ILine>
  items: TNodeItems
  addLine: VoidFunction
  removeLine: (id: ID) => void
}

const useItemsStore = create<ItemsState>((set) => ({
  lines: mockLines,
  items: mockItems,
  addLine: () =>
    set((state: ItemsState) => ({
      lines: [...state.lines, { id: uuidv4(), name: '' }],
    })),
  removeLine: (id: ID) =>
    set((state: ItemsState) => ({
      lines: state.lines.filter((line) => line.id !== id),
    })),
}))

export default useItemsStore
