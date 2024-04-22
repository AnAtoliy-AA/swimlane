import { useContext } from 'react'
import { ThemeContext } from '../providers/themeProvider'

export const useTheme = () => useContext(ThemeContext)
