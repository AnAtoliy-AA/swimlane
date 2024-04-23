import {
  SetStateAction,
  createContext,
  ReactNode,
  useState,
  Dispatch,
} from 'react'
import { THEMES, Theme, ThemeType } from '../constants/styles/theme'

interface ThemeContextProps {
  themeType: ThemeType
  theme: Theme
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>> | null //you can use it for theme mode switching(switcher not implemented)
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: 'light',
  theme: THEMES['light'],
  setCurrentTheme: null,
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
