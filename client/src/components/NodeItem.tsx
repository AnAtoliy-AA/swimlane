import { ID, INodeItem, TShape } from '@/types/INodeItem'
import styled from 'styled-components'
import Draggable from './dnd/Draggable'
import { ArcherElement } from 'react-archer'

interface IProps {
  nodeItem: INodeItem
  lineId?: ID
}

const NodeVariants: Record<TShape, string> = {
  rectangle: `
  height: 50px;
  width: 100px;
  `,
  oval: `
  height: 50px;
  width: 100px;
  border-radius: 50%;
  `,
  rhombus: `
  width: 100px;
	height: 100px;
	transform: rotate(-45deg) skew(10deg, 10deg);
  `,
}

const NodeItemWrapper = styled.div<{
  $shape?: TShape
}>`
  background: var(--background-secondary);

  ${({ $shape }) =>
    $shape ? NodeVariants[$shape as TShape] : NodeVariants.rectangle}
`

const NodeItem = ({ nodeItem, lineId }: IProps) => {
  const { id, text, shape, targetId } = nodeItem

  return (
    <Draggable id={id} lineId={lineId}>
      <ArcherElement
        id={`${id}`}
        relations={[
          {
            targetId: targetId || '',
            targetAnchor: 'top',
            sourceAnchor: 'bottom',
          },
        ]}
      >
        <NodeItemWrapper $shape={shape}>
          <p>{text}</p>
        </NodeItemWrapper>
      </ArcherElement>
    </Draggable>
  )
}

export default NodeItem
