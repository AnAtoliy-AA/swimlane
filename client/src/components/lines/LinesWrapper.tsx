import { ILine } from '@/types/ILine'
import Line from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'

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
  const [lines, setLines] = useState<Array<ILine>>(mockLines)
  const addLine = useCallback(() => {
    setLines((prev) => {
      const lastItemId = prev[length - 1]?.id

      return [...prev, { id: lastItemId ? lastItemId : 0, name: '' }]
    })
  }, [])

  return (
    <Wrapper>
      {lines.map((line: ILine) => {
        return <Line line={line} />
      })}
      <AddComponent cb={addLine} />
    </Wrapper>
  )
}

export default LinesWrapper
