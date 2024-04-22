import { create } from 'zustand'

export interface SettigsState {
  isHorizontal: boolean
  toggleIsHorizontal: VoidFunction
}

const useSettingsStore = create<SettigsState>((set) => ({
  isHorizontal: true,
  toggleIsHorizontal: () =>
    set((state: SettigsState) => ({
      isHorizontal: !state.isHorizontal,
    })),
}))

export default useSettingsStore
