import { ILine } from '@/types/ILine'
import Line from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'
import { INodeItem } from '@/types/INodeItem'

const mockLines: Array<ILine> = [
  { id: 1, name: 'customer' },
  { id: 2, name: 'sales' },
  { id: 3, name: 'stocks' },
  { id: 4, name: 'finance' },
]

const mockItems: Map<ILine, Array<INodeItem>> = new Map()

mockItems.set(mockLines[0], [
  {
    id: 0,
    text: 'Place a product order',
    position: { lineId: mockLines[0].id, index: 0 },
  },
])
mockItems.set(mockLines[1], [
  {
    id: 1,
    text: 'Confirm if order is recieved',
    position: { lineId: mockLines[1].id, index: 0 },
  },
])
mockItems.set(mockLines[2], [
  {
    id: 2,
    text: 'Check the stock',
    position: { lineId: mockLines[2].id, index: 0 },
  },
])

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
  const [nodeItems] = useState<Map<ILine, Array<INodeItem>>>(mockItems)

  const addLine = useCallback(() => {
    setLines((prev) => {
      const lastItemId = prev[length - 1]?.id

      return [...prev, { id: lastItemId ? lastItemId : 0, name: '' }]
    })
  }, [])

  const removeLine = useCallback((id: number | string) => {
    setLines((prev) => prev.filter((line) => line.id !== id))
  }, [])

  return (
    <Wrapper>
      {lines.map((line: ILine) => {
        const items = nodeItems.get(line)

        return <Line line={line} remove={removeLine} items={items} />
      })}
      <AddComponent add={addLine} />
    </Wrapper>
  )
}

export default LinesWrapper
