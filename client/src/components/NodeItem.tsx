import { ID, INodeItem, TShape } from '@/types/INodeItem'
import styled from 'styled-components'
import Draggable from './dnd/Draggable'
import { ITEM_SIZE } from '@/utils/moveItem'
import Xarrow from 'react-xarrows'
import { useCallback, useState } from 'react'
import { ModalContainer, OutsideBackground } from './styled/ModalContainer'

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
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--background-secondary);

  ${({ $shape }) =>
    $shape ? NodeVariants[$shape as TShape] : NodeVariants.rectangle};

  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`

const NodeItem = ({ nodeItem, lineId }: IProps) => {
  const { id, text, shape, targetIds, createdAt } = nodeItem

  const [isItemInfo, setIsItemInfo] = useState<boolean>(false)

  const toggleItemInfo = useCallback(() => setIsItemInfo((prev) => !prev), [])

  return (
    <NodeItemWrapper id={`${id}`} $shape={shape} $isVisible={!!text}>
      <button onClick={toggleItemInfo}>ShowInfo</button>
      <Draggable id={id} lineId={lineId}>
        <ModalContainer $isVisible={isItemInfo}>
          <OutsideBackground $isVisible={isItemInfo} onClick={toggleItemInfo} />
          <p>XXXXXXXXX</p>
          <p>{createdAt}</p>
        </ModalContainer>
        {String(isItemInfo)}
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
    </NodeItemWrapper>
  )
}

export default NodeItem
