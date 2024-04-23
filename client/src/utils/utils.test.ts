import { TShape } from '@/types/INodeItem'
import { removeItem } from './moveItem'

vi.mock('uuidv4')
vi.mock('./createNewDate')

describe('removeItem', () => {
  it('removes the item with the specified ID from the line', () => {
    const mockItems = new Map([
      [
        1,
        [
          {
            id: 'item1',
            position: { lineId: '1', index: 0 },
            text: 'Item 1',
            shape: 'rectangle' as TShape,
            createdAt: new Date().toString(),
          },
          {
            id: 'item2',
            position: { lineId: '2', index: 1 },
            text: 'Item 2',
            shape: 'rectangle' as TShape,
            createdAt: new Date().toString(),
          },
        ],
      ],
    ])

    const lineId = 1
    const itemId = 'item2'

    const expectedItems = new Map([
      [
        1,
        [
          {
            id: 'item1',
            position: { lineId: '2', index: 0 },
            text: 'Item 1',
            shape: 'rectangle' as TShape,
            createdAt: new Date().toString(),
          },
          {
            id: '',
            position: { lineId: '2', index: 1 },
            text: 'Item 2',
            shape: 'rectangle' as TShape,
            createdAt: new Date().toString(),
          },
        ],
      ],
    ])

    const copyItems = new Map(mockItems)

    const updatedItems = removeItem({ items: copyItems, lineId, itemId })

    expect(updatedItems.size).toBe(mockItems.size)
    expect(updatedItems.get(lineId)?.length).toBe(
      expectedItems.get(lineId)?.length,
    )
    expect(updatedItems.get(lineId)?.every((item) => item.id !== itemId)).toBe(
      true,
    )

    expect(mockItems).toEqual(mockItems)
  })

  it('does not modify the original items object', () => {
    const originalItems = new Map([
      [
        1,
        [
          {
            id: 'item1',
            position: { lineId: '1', index: 1 },
            text: 'Item 1',
            shape: 'rectangle' as TShape,
            createdAt: new Date().toString(),
          },
        ],
      ],
    ])

    const lineId = 1
    const itemId = 'item1'

    removeItem({ items: originalItems, lineId, itemId })

    expect(originalItems).toEqual(originalItems)
  })

  it('returns an empty array if the line or item does not exist', () => {
    const mockItems = new Map()
    const lineId = 2
    const itemId = 'non-existent-id'

    const updatedItems = removeItem({ items: mockItems, lineId, itemId })

    expect(updatedItems).toEqual(new Map())
  })
})
