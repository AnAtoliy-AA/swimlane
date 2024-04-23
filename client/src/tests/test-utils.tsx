import { RenderOptions, render } from '@testing-library/react'
import { ReactElement } from 'react'
import { AllProviders } from '../providers/allProviders'

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
