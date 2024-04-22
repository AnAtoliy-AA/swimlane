import { ILine } from '@/types/ILine'
import Line, { LineWrapper } from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'
import { ID, INodeItem } from '@/types/INodeItem'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { ArcherContainer } from 'react-archer'
import moveItem from '@/utils/moveItem'
import useSettingsStore from '@/store/settingsStore'

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
    targetId: '21',
  },
])
mockItems.set(mockLines[1].id, [
  {
    id: '21',
    text: 'Confirm if order is recieved',
    position: { lineId: mockLines[1].id, index: 0 },
    targetId: '22',
  },
])
mockItems.set(mockLines[2].id, [
  {
    id: '22',
    text: 'Check the stock',
    position: { lineId: mockLines[2].id, index: 0 },
    targetId: '20',
  },
])

const Wrapper = styled.div<{
  $direction?: boolean
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction ? 'row' : 'column')};
  width: 80vw;
  height: 80vh;
  justify-content: space-around;
  gap: 20px;
  margin: 0 auto;
`

const LinesWrapper = () => {
  const { isHorizontal } = useSettingsStore()

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

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event

    setNodeItems((prev) =>
      moveItem({ items: prev, itemId: active?.id, destinationId: over?.id }),
    )
  }, [])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ArcherContainer strokeColor='var(--background-secondary)'>
        <Wrapper $direction={isHorizontal}>
          {lines.map((line: ILine) => {
            const items = nodeItems.get(line.id)

            return (
              <Line
                key={line.id}
                line={line}
                remove={removeLine}
                items={items}
              />
            )
          })}
          <LineWrapper>
            <AddComponent add={addLine} />
          </LineWrapper>
        </Wrapper>
      </ArcherContainer>
    </DndContext>
  )
}

export default LinesWrapper
