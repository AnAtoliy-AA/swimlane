import { ILine } from '@/types/ILine'
import { ID, INodeItem } from '@/types/INodeItem'
import { createNewDate } from '@/utils/createNewDate'

export const mockLines: Array<ILine> = [
  { id: '31', name: 'customer' },
  { id: '32', name: 'sales' },
  { id: '33', name: 'stocks' },
  { id: '34', name: 'finance' },
]
export type TNodeItems = Map<ID, Array<INodeItem>>

const mockItems: TNodeItems = new Map()

export const fillMockItems = () => {
  mockItems.set(mockLines[0].id.toString(), [
    {
      id: '20',
      text: 'Place a product order',
      position: { lineId: mockLines[0].id, index: 0 },
      targetIds: ['21'],
      createdAt: createNewDate(),
    },
    {
      id: '24',
      text: '',
      position: { lineId: mockLines[0].id, index: 1 },
      createdAt: createNewDate(),
    },
    {
      id: '28',
      text: '',
      position: { lineId: mockLines[0].id, index: 2 },
      createdAt: createNewDate(),
    },
    {
      id: '32',
      text: 'FINISH',
      position: { lineId: mockLines[0].id, index: 3 },
      createdAt: createNewDate(),
    },
  ])
  mockItems.set(mockLines[1].id, [
    {
      id: '21',
      text: 'Confirm if order is recieved',
      position: { lineId: mockLines[1].id, index: 0 },
      targetIds: ['22'],
      createdAt: createNewDate(),
    },
    {
      id: '25',
      text: 'Cancel the order',
      position: { lineId: mockLines[1].id, index: 1 },
      createdAt: createNewDate(),
    },
    {
      id: '29',
      text: '',
      position: { lineId: mockLines[1].id, index: 2 },
      createdAt: createNewDate(),
    },
    {
      id: '33',
      text: '',
      position: { lineId: mockLines[1].id, index: 3 },
      createdAt: createNewDate(),
    },
  ])
  mockItems.set(mockLines[2].id, [
    {
      id: '22',
      text: 'Check the stock',
      position: { lineId: mockLines[2].id, index: 0 },
      targetIds: ['26'],
      shape: 'oval',
      createdAt: createNewDate(),
    },
    {
      id: '26',
      text: 'Is the product in stock',
      position: { lineId: mockLines[2].id, index: 1 },
      targetIds: ['25', '27'],
      shape: 'oval',
      createdAt: createNewDate(),
    },
    {
      id: '30',
      text: '',
      position: { lineId: mockLines[2].id, index: 2 },
      createdAt: createNewDate(),
    },
    {
      id: '34',
      text: 'XX',
      position: { lineId: mockLines[2].id, index: 3 },
      targetIds: ['32'],
      createdAt: createNewDate(),
    },
  ])

  mockItems.set(mockLines[3].id, [
    {
      id: '23',
      text: '',
      position: { lineId: mockLines[2].id, index: 0 },
      createdAt: createNewDate(),
    },
    {
      id: '27',
      text: 'check credit card',
      position: { lineId: mockLines[2].id, index: 1 },
      targetIds: ['31'],
      shape: 'oval',
      createdAt: createNewDate(),
    },
    {
      id: '31',
      text: 'Is credit card valid?',
      position: { lineId: mockLines[2].id, index: 2 },
      targetIds: ['35'],
      createdAt: createNewDate(),
    },
    {
      id: '35',
      text: 'Payment??',
      position: { lineId: mockLines[2].id, index: 2 },
      targetIds: ['34'],
      createdAt: createNewDate(),
    },
  ])
}

fillMockItems() // TODO remove it after BE implementation

export default mockItems
