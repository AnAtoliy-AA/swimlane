import { TShape } from '@/types/INodeItem'
import { create } from 'zustand'

export interface FilterState {
  textFilter: string
  filterByShape: Array<TShape>
  setTextFilter: (value: string) => void
  setShapeFilter: (value: TShape) => void
}

const useFilterStore = create<FilterState>((set) => ({
  textFilter: '',
  filterByShape: ['rectangle', 'rhombus', 'oval'],
  setTextFilter: (value: string) => set({ textFilter: value }),
  setShapeFilter: (value: TShape) =>
    set((state: FilterState) => ({
      filterByShape: state.filterByShape?.includes(value)
        ? state.filterByShape.filter((item) => item !== value)
        : [...state.filterByShape, value],
    })),
}))

export default useFilterStore
