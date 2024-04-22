import { ILine } from '@/types/ILine'
import Line from './Line'
import styled from 'styled-components'

const mockLines: Array<ILine> = [
  { id: 1, name: 'customer' },
  { id: 2, name: 'sales' },
  { id: 3, name: 'stocks' },
  { id: 4, name: 'finance' },
]

type TDirection = 'column' | 'row'

const Wrapper = styled.div<{
  $direction?: TDirection
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction ? $direction : 'column')};

  background-color: var(--background);
`

const LinesWrapper = () => {
  return (
    <Wrapper>
      {mockLines.map((line: ILine) => {
        return <Line line={line} />
      })}
    </Wrapper>
  )
}

export default LinesWrapper
