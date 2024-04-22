import { create } from 'zustand'

export interface SettigsState {
  isHorizontal: boolean
  isModalOpen: boolean
  toggleIsHorizontal: VoidFunction
  toggleIsModalOpen: VoidFunction
}

const useSettingsStore = create<SettigsState>((set) => ({
  isHorizontal: false,
  isModalOpen: false,
  toggleIsHorizontal: () =>
    set((state: SettigsState) => ({
      isHorizontal: !state.isHorizontal,
    })),
  toggleIsModalOpen: () =>
    set((state: SettigsState) => ({
      isModalOpen: !state.isModalOpen,
    })),
}))

export default useSettingsStore
