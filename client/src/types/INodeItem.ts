import { UniqueIdentifier } from '@dnd-kit/core'

export type ID = UniqueIdentifier

export interface IPosition {
  lineId: ID
  index: number
}

export interface INodeItem {
  id: ID
  text: string
  position: IPosition
}
