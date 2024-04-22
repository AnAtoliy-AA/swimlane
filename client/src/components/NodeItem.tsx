import { ID, INodeItem, TShape } from '@/types/INodeItem'
import styled from 'styled-components'
import Draggable from './dnd/Draggable'
import { ArcherElement } from 'react-archer'
import { ITEM_SIZE } from '@/utils/moveItem'

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
  const { id, text, shape, targetId } = nodeItem

  return (
    <Draggable id={id} lineId={lineId}>
      <NodeItemWrapper $shape={shape} $isVisible={!!text}>
        {targetId ? (
          <ArcherElement
            id={`${id}`}
            relations={[
              {
                targetId: targetId,
                targetAnchor: 'top',
                sourceAnchor: 'bottom',
              },
            ]}
          >
            <p>{text}</p>
          </ArcherElement>
        ) : (
          <p>{text}</p>
        )}
      </NodeItemWrapper>
    </Draggable>
  )
}

export default NodeItem
