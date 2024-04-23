import { create } from 'zustand'

export interface FilterState {
  textFilter: string
  filterByShape: string
  setTextFilter: (value: string) => void
  setShapeFilter: (value: string) => void
}

const useFilterStore = create<FilterState>((set) => ({
  textFilter: '',
  filterByShape: '',
  setTextFilter: (value: string) => set({ textFilter: value }),
  setShapeFilter: (value: string) => set({ filterByShape: value }),
}))

export default useFilterStore
