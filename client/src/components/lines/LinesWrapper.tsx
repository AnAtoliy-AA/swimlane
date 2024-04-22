import { ILine } from '@/types/ILine'
import Line from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'
import { ID, INodeItem } from '@/types/INodeItem'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import moveItem from '@/utils/moveItem'

const mockLines: Array<ILine> = [
  { id: '31', name: 'customer' },
  { id: '32', name: 'sales' },
  { id: '33', name: 'stocks' },
  { id: '34', name: 'finance' },
]
export type TNodeItems = Map<ID, Array<INodeItem>>

const mockItems: TNodeItems = new Map()

mockItems.set(mockLines[0].id.toString(), [
  {
    id: '20',
    text: 'Place a product order',
    position: { lineId: mockLines[0].id, index: 0 },
  },
])
mockItems.set(mockLines[1].id, [
  {
    id: '21',
    text: 'Confirm if order is recieved',
    position: { lineId: mockLines[1].id, index: 0 },
  },
])
mockItems.set(mockLines[2].id, [
  {
    id: '22',
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
  const [nodeItems, setNodeItems] = useState<TNodeItems>(mockItems)

  const addLine = useCallback(() => {
    setLines((prev) => {
      const lastItemId = Number(prev[length - 1]?.id)

      return [...prev, { id: lastItemId ? lastItemId + 1 : 0, name: '' }]
    })
  }, [])

  const removeLine = useCallback((id: number | string) => {
    setLines((prev) => prev.filter((line) => line.id !== id))
  }, [])

  console.log('active', nodeItems)
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event

    console.log('O', over)
    console.log('active', active)
    setNodeItems((prev) =>
      moveItem({ items: prev, itemId: active?.id, destinationId: over?.id }),
    )
  }, [])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Wrapper>
        {lines.map((line: ILine) => {
          const items = nodeItems.get(line.id)

          return (
            <Line key={line.id} line={line} remove={removeLine} items={items} />
          )
        })}
        <AddComponent add={addLine} />
      </Wrapper>
    </DndContext>
  )
}

export default LinesWrapper
