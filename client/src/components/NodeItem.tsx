import { ID, INodeItem } from '@/types/INodeItem'
import styled from 'styled-components'
import Draggable from './dnd/Draggable'

interface IProps {
  nodeItem: INodeItem
  lineId?: ID
}

const NodeItemWrapper = styled.div`
  background: var(--background-secondary);
`

const NodeItem = ({ nodeItem, lineId }: IProps) => {
  const { id, text } = nodeItem

  return (
    <Draggable id={id} lineId={lineId}>
      <NodeItemWrapper>
        <p>{text}</p>
      </NodeItemWrapper>
    </Draggable>
  )
}

export default NodeItem
