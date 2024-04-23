import { create } from 'zustand'

export interface SettigsState {
  isHorizontal: boolean
  isModalOpen: boolean
  isEditionBlocked: boolean
  toggleIsHorizontal: VoidFunction
  toggleIsModalOpen: VoidFunction
  toggleIsEditionBlocked: VoidFunction
}

const useSettingsStore = create<SettigsState>((set) => ({
  isHorizontal: false,
  isModalOpen: false,
  isEditionBlocked: false,
  toggleIsHorizontal: () =>
    set((state: SettigsState) => ({
      isHorizontal: !state.isHorizontal,
    })),
  toggleIsModalOpen: () =>
    set((state: SettigsState) => ({
      isModalOpen: !state.isModalOpen,
    })),
  toggleIsEditionBlocked: () =>
    set((state: SettigsState) => ({
      isEditionBlocked: !state.isEditionBlocked,
    })),
}))

export default useSettingsStore
