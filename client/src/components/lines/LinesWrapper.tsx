import { ILine } from '@/types/ILine'
import Line, { LineWrapper } from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import useSettingsStore from '@/store/settingsStore'
import { ModalContainer } from '../styled/Modal/ModalContainer'
import useItemsStore from '@/store/itemsStore'
import { useXarrow } from 'react-xarrows'

const Wrapper = styled.div<{
  $direction?: boolean
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction ? 'column' : 'row')};
  min-width: 80vw;
  min-height: 85vh;
  gap: 20px;
  margin: 0 auto;
`

const LinesWrapper = () => {
  const { isHorizontal } = useSettingsStore()
  const { lines, nodeItems, addLine, removeLine, moveItems } = useItemsStore()
  const updateXarrow = useXarrow()

  const [isDragModalOpen, setIsDragModalOpen] = useState<boolean>(false)

  const toggleDragModalOpen = useCallback(() => {
    setIsDragModalOpen((prev) => !prev)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { over, active, delta } = event
      const lineId = active?.data?.current?.lineId

      const destinationId = over?.id

      if (lineId !== destinationId) {
        toggleDragModalOpen()
      }

      moveItems({
        itemId: active?.id,
        lineId,
        destinationId,
        deltaY: delta.y,
      })

      updateXarrow()
    },
    [moveItems, toggleDragModalOpen, updateXarrow],
  )

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Wrapper $direction={isHorizontal}>
        {lines.map((line: ILine) => {
          const items = nodeItems.get(line.id)

          return (
            <Line key={line.id} line={line} remove={removeLine} items={items} />
          )
        })}
        <LineWrapper>
          <AddComponent add={addLine} />
        </LineWrapper>
      </Wrapper>
      <ModalContainer
        isModalShown={isDragModalOpen}
        onClick={toggleDragModalOpen}
      >
        <p>Add additional info</p>
      </ModalContainer>
    </DndContext>
  )
}

export default LinesWrapper
