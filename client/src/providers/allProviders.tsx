import { CSSProperties, PropsWithChildren } from 'react'
import { ThemeProvider } from './themeProvider'
import GlobalStyle from '../constants/styles/theme'
import { useTheme } from '@/hooks/useTheme'

export const AllProviders = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme()

  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <div style={{ ...theme } as CSSProperties}>{children}</div>
      </ThemeProvider>
    </>
  )
}
