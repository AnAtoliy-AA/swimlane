import { ILine } from '@/types/ILine'
import { INodeItem } from '@/types/INodeItem'
import { useCallback } from 'react'
import NodeItem from '../NodeItem'
import Droppable from '../dnd/Droppable'
import styled from 'styled-components'
import { RemoveSVG } from '@/assets/RemoveSVG'
import useSettingsStore from '@/store/settingsStore'

interface IProps {
  line: ILine
  items?: Array<INodeItem>
  remove?: (id: number | string) => void
}

export const LineWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 150px;
  min-width: 200px;
  background-color: var(--background);
  border: 1px solid var(--text);
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`

const Line = ({ line, items, remove }: IProps) => {
  const { id, name } = line
  const { isHorizontal } = useSettingsStore()

  const handleRemove = useCallback(() => {
    if (remove) {
      remove(id)
    }
  }, [id, remove])

  return (
    <Droppable id={id}>
      <LineWrapper>
        <LineHeader>
          <p>{name}</p>
          <button onClick={handleRemove}>
            <RemoveSVG />
          </button>
        </LineHeader>
        <ItemsWrapper $direction={isHorizontal}>
          {items?.map((nodeItem: INodeItem) => {
            return (
              <NodeItem key={nodeItem.id} nodeItem={nodeItem} lineId={id} />
            )
          })}
        </ItemsWrapper>
      </LineWrapper>
    </Droppable>
  )
}

export default Line
