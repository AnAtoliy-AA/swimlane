import { css } from 'styled-components'
import { createGlobalStyle } from 'styled-components'

// color names used from https://www.color-meanings.com/list-of-colors-names-hex-codes/
enum Color {
  ORANGE = '#F86F03',
  BLUE = '#525FE1',
  BABY_BLUE = '#89CFF0',
  LIGHT_GRAY = '#F4F4F4',
  WHITE = '#FFF',
  RED = '#FF0000',
  FLAME = '#E34A27',
  CORAL = '#FF7F50',
  GREEN = '#008000',
  CYAN_TEAL = '#23C560',
  JADE_GREEN = '#07AC45',
  PARIS_GREEN = '#50C878',
  SPRING = '#00F0A8',
  BLACK = '#000000',
  GRAY = '#808080',
  CLOUD = '#C5C6D0',
  SILVER = '#ADADC9',
  PASTEL_GRAY = '#CCCDC6',
  SILVER_CLOUD = '#CCC',
  LIGHT_SILVER = '#BBB',
  YELLOW = '#FFFF00',
  PURPLE = '#800080',
  BROWN = '#A52A2A',
  BLUSH_RED = '#BC544B',
  AMARANTH_RED = '#F4364C',
  PINK = '#FFC0CB',
  PASTEL_PINK = '#FFD1DC',
  TEAL = '#008080',
  GHOST_WHITE = '#F3F6FC',
}

export interface Theme {
  '--primary': Color
  '--secondary': Color
  '--background': Color
  '--background-secondary': Color
  '--text': Color
  '--text-light': Color
  '--text-title': Color
  '--text-converted': Color
  '--success': Color
  '--success-secondary': Color
  '--error': Color
  '--error-secondary': Color
  '--error-third': Color
  '--cancel': Color
  '--text-input-border': Color
  '--text-input-outlined': Color
  '--button-primary': Color
  '--button-secondary': Color
}

export type ThemeType = 'dark' | 'light'

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.BLUE,
    '--secondary': Color.CYAN_TEAL,
    '--background': Color.GHOST_WHITE,
    '--background-secondary': Color.SILVER_CLOUD,
    '--text': Color.BLACK,
    '--text-light': Color.WHITE,
    '--text-converted': Color.WHITE,
    '--text-title': Color.TEAL,
    '--success': Color.CYAN_TEAL,
    '--success-secondary': Color.JADE_GREEN,
    '--error': Color.RED,
    '--error-secondary': Color.CORAL,
    '--error-third': Color.PASTEL_PINK,
    '--cancel': Color.BLUE,
    '--text-input-border': Color.SILVER_CLOUD,
    '--text-input-outlined': Color.LIGHT_SILVER,
    '--button-primary': Color.GRAY,
    '--button-secondary': Color.LIGHT_GRAY,
  },
  dark: {
    '--primary': Color.PURPLE,
    '--secondary': Color.WHITE,
    '--background': Color.GRAY,
    '--background-secondary': Color.BABY_BLUE,
    '--text': Color.WHITE,
    '--text-light': Color.WHITE,
    '--text-converted': Color.GRAY,
    '--text-title': Color.TEAL,
    '--success': Color.PARIS_GREEN,
    '--success-secondary': Color.SPRING,
    '--error': Color.FLAME,
    '--error-secondary': Color.CORAL,
    '--error-third': Color.PASTEL_PINK,
    '--cancel': Color.BLUE,
    '--text-input-border': Color.SILVER_CLOUD,
    '--text-input-outlined': Color.LIGHT_SILVER,
    '--button-primary': Color.GRAY,
    '--button-secondary': Color.LIGHT_GRAY,
  },
}

export const device = {
  xs: '400px',
  sm: '600px',
  md: '900px',
  lg: '1280px',
  xl: '1440px',
  xxl: '1920px',
}

export const media = {
  xs: <Props extends TemplateStringsArray>(args: Props) => css`
    @media (max-width: ${device.xs}) {
      ${css(args)};
    }
  `,
  sm: <Props extends TemplateStringsArray>(args: Props) => css`
    @media (max-width: ${device.sm}) {
      ${css(args)};
    }
  `,
  md: <Props extends TemplateStringsArray>(args: Props) => css`
    @media (max-width: ${device.md}) {
      ${css(args)};
    }
  `,
  lg: <Props extends TemplateStringsArray>(args: Props) => css`
    @media (max-width: ${device.lg}) {
      ${css(args)};
    }
  `,
  xl: <Props extends TemplateStringsArray>(args: Props) => css`
    @media (max-width: ${device.xl}) {
      ${css(args)};
    }
  `,
  xxl: <Props extends TemplateStringsArray>(args: Props) => css`
    @media (max-width: ${device.xxl}) {
      ${css(args)};
    }
  `,
}

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Arial,
    Noto Sans,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
  }

  input {
    all: unset;
  }
`

export default GlobalStyle
