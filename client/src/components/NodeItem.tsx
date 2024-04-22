import { INodeItem } from '@/types/INodeItem'
import styled from 'styled-components'

interface IProps {
  nodeItem: INodeItem
}

const NodeItemWrapper = styled.div`
  background: var(--background-secondary);
`

const NodeItem = ({ nodeItem }: IProps) => {
  const { text } = nodeItem
  return (
    <NodeItemWrapper>
      <p>{text}</p>
    </NodeItemWrapper>
  )
}

export default NodeItem
