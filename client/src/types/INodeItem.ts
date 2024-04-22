export interface IPosition {
  lineId: number | string
  index: number
}

export interface INodeItem {
  id: number | string
  text: string
  position: IPosition
}
