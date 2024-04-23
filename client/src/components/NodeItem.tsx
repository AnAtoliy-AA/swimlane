import { ID, INodeItem, TShape } from '@/types/INodeItem'
import styled from 'styled-components'
import Draggable from './dnd/Draggable'
import { ITEM_SIZE } from '@/utils/moveItem'
import Xarrow from 'react-xarrows'
import { useCallback, useState } from 'react'
import { ModalContainer } from './styled/Modal/ModalContainer'
import useFilterStore from '@/store/filterStore'

interface IProps {
  nodeItem: INodeItem
  lineId?: ID
}

const NodeVariants: Record<TShape, string> = {
  rectangle: `
  height: ${ITEM_SIZE}px;
  width: ${ITEM_SIZE}px;
  `,
  oval: `
  height: ${ITEM_SIZE}px;
  width: ${ITEM_SIZE}px;
  border-radius: 50%;
  `,
  rhombus: `
  width: ${ITEM_SIZE}px;
	height: ${ITEM_SIZE}px;
	transform: rotate(-45deg) skew(10deg, 10deg);
  `,
}

const NodeItemWrapper = styled.div<{
  $shape?: TShape
  $isVisible?: boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
  background: var(--background-secondary);

  ${({ $shape }) =>
    $shape ? NodeVariants[$shape as TShape] : NodeVariants.rectangle};

  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`

const NodeItem = ({ nodeItem, lineId }: IProps) => {
  const { id, text, shape, targetIds, createdAt, changedAt } = nodeItem

  const { textFilter } = useFilterStore()

  const [isItemInfo, setIsItemInfo] = useState<boolean>(false)

  const toggleItemInfo = useCallback(() => setIsItemInfo((prev) => !prev), [])

  return (
    <NodeItemWrapper
      id={`${id}`}
      $shape={shape}
      $isVisible={
        !!text && text?.toLowerCase().includes(textFilter?.toLowerCase())
      }
    >
      <ModalContainer isModalShown={isItemInfo} onClick={toggleItemInfo}>
        <h3>Additional info</h3>
        <p>Created at: {createdAt}</p>
        {changedAt && <p>Last changed at: {changedAt[changedAt.length - 1]}</p>}
        {changedAt && (
          <div>
            History of changes:
            {changedAt.map((el) => {
              return <p key={el}>{el}</p>
            })}
          </div>
        )}
        <button onClick={toggleItemInfo}>Close Info</button>
      </ModalContainer>
      <Draggable id={id} lineId={lineId}>
        <p>{text}</p>
        {targetIds &&
          targetIds.map((targetId) => {
            return (
              <Xarrow
                key={targetId}
                color='var(--text-title)'
                start={`${id}`}
                end={targetId}
                // endAnchor={+id > +targetId ? 'bottom' : 'auto'}
              />
            )
          })}
      </Draggable>
      <button onClick={toggleItemInfo}>ShowInfo</button>
    </NodeItemWrapper>
  )
}

export default NodeItem
