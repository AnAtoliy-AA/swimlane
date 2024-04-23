import { ILine } from '@/types/ILine'
import { ID, INodeItem } from '@/types/INodeItem'
import { useCallback } from 'react'
import NodeItem from '../NodeItem'
import Droppable from '../dnd/Droppable'
import styled from 'styled-components'
import useSettingsStore from '@/store/settingsStore'
import { ITEMS_GAP } from '@/utils/moveItem'
import AddComponent from '../AddComponent'
import useItemsStore from '@/store/itemsStore'
import RemoveComponent from '../RemoveComponent'

interface IProps {
  line: ILine
  items?: Array<INodeItem>
  remove?: (id: number | string) => void
}

export const LineWrapper = styled.div<{
  $direction?: boolean
}>`
  width: 100%;
  height: 100%;
  min-height: 150px;
  min-width: 200px;
  background-color: var(--background);
  border: 1px solid var(--text);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;

  ${({ $direction }) => !$direction && 'max-width: 300px'};
`

const LineHeader = styled.div`
  display: flex;
  justify-content: space-around;
`

const ItemsWrapper = styled.div<{
  $direction?: boolean
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction ? 'row' : 'column')};
  gap: ${ITEMS_GAP}px;
`

const Line = ({ line, items, remove }: IProps) => {
  const { id, name } = line
  const { isHorizontal } = useSettingsStore()
  const { addItems } = useItemsStore()

  const handleAddItemClick = useCallback(
    (id: ID) => () => {
      addItems(id)
    },
    [addItems],
  )

  const handleRemove = useCallback(() => {
    if (remove) {
      remove(id)
    }
  }, [id, remove])

  return (
    <Droppable id={id}>
      <LineWrapper $direction={isHorizontal}>
        <LineHeader>
          <p>{name}</p>
          <RemoveComponent remove={handleRemove} />
        </LineHeader>
        <ItemsWrapper $direction={isHorizontal}>
          {items?.map((nodeItem: INodeItem) => {
            return (
              <NodeItem key={nodeItem.id} nodeItem={nodeItem} lineId={id} />
            )
          })}
        </ItemsWrapper>
        <AddComponent add={handleAddItemClick(id)} />
      </LineWrapper>
    </Droppable>
  )
}

export default Line
