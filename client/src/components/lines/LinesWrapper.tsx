import { ILine } from '@/types/ILine'
import Line, { LineWrapper } from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { ArcherContainer } from 'react-archer'
import moveItem from '@/utils/moveItem'
import useSettingsStore from '@/store/settingsStore'
import mockItems, { TNodeItems, mockLines } from '@/constants/mocks'

const Wrapper = styled.div<{
  $direction?: boolean
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction ? 'column' : 'row')};
  width: 80vw;
  height: 90vh;
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
    const { over, active, delta } = event

    setNodeItems((prev) =>
      moveItem({
        items: prev,
        itemId: active?.id,
        destinationId: over?.id,
        deltaY: delta.y,
      }),
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
