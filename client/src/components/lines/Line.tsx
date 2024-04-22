import { ILine } from '@/types/ILine'
import { INodeItem } from '@/types/INodeItem'
import { useCallback } from 'react'
import NodeItem from '../NodeItem'
import Droppable from '../dnd/Droppable'
import styled from 'styled-components'
import { RemoveSVG } from '@/assets/RemoveSVG'

interface IProps {
  line: ILine
  items?: Array<INodeItem>
  remove?: (id: number | string) => void
}

export const LineWrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  border: 1px solid var(--text);
  display: flex;
  justify-content: center;
`

const LineHeader = styled.div`
  display: flex;
  justify-content: space-around;
`

const Line = ({ line, items, remove }: IProps) => {
  const { id, name } = line

  const handleRemove = useCallback(() => {
    if (remove) {
      remove(id)
    }
  }, [id, remove])

  return (
    <LineWrapper>
      <Droppable id={id}>
        <LineHeader>
          <p>{name}</p>
          <button onClick={handleRemove}>
            <RemoveSVG />
          </button>
        </LineHeader>
        {items?.map((nodeItem: INodeItem) => {
          return <NodeItem key={nodeItem.id} nodeItem={nodeItem} lineId={id} />
        })}
      </Droppable>
    </LineWrapper>
  )
}

export default Line
