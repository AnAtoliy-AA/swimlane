import { ILine } from '@/types/ILine'
import Line, { LineWrapper } from './Line'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import AddComponent from '../AddComponent'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { ArcherContainer } from 'react-archer'
import moveItem from '@/utils/moveItem'
import useSettingsStore from '@/store/settingsStore'
import mockItems, { TNodeItems } from '@/constants/mocks'
import { ModalContainer } from '../styled/Modal/ModalContainer'
import useItemsStore from '@/store/itemsStore'

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

  const [nodeItems, setNodeItems] = useState<TNodeItems>(mockItems)
  const [isDragModalOpen, setIsDragModalOpen] = useState<boolean>(false)

  const { lines, addLine, removeLine } = useItemsStore()

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

      setNodeItems((prev) =>
        moveItem({
          items: prev,
          itemId: active?.id,
          lineId,
          destinationId,
          deltaY: delta.y,
        }),
      )
    },
    [toggleDragModalOpen],
  )

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
        <ModalContainer
          isModalShown={isDragModalOpen}
          onClick={toggleDragModalOpen}
        >
          <p>Confirm</p>
        </ModalContainer>
      </ArcherContainer>
    </DndContext>
  )
}

export default LinesWrapper
