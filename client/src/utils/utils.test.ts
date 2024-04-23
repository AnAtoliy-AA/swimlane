import { TShape } from '@/types/INodeItem'
import { addItem, removeItem } from './moveItem'

vi.mock('uuidv4')
vi.mock('./createNewDate')

describe('utils tests', () => {
  describe('addItem', () => {
    it('adds a new item with a unique ID and default text/shape to the specified line', () => {
      const mockItems = new Map([
        [
          1,
          [
            {
              id: 'item1',
              text: 'Item 1',
              shape: 'rectangle' as TShape,
              position: { lineId: 1, index: 0 },
            },
          ],
        ],
      ])

      const lineId = 1

      const expectedItems = new Map([
        [
          1,
          [
            {
              id: 'item1',
              text: 'Item 1',
              shape: 'rectangle',
              position: { lineId: 1, index: 0 },
            },
            {
              id: expect.any(String),
              text: 'newItem',
              shape: 'rectangle' as TShape,
              position: { lineId: 1, index: 1 },
            },
          ],
        ],
      ])

      const updatedItems = addItem({ items: mockItems, lineId })

      expect(updatedItems.size).toBe(mockItems.size)
      expect(updatedItems.get(lineId)?.length).toBe(
        expectedItems.get(lineId)?.length,
      )
      expect(
        updatedItems.get(lineId)?.some((item) => item.text === 'newItem'),
      ).toBe(true)
      expect(
        updatedItems.get(lineId)?.every((item) => typeof item.id === 'string'),
      ).toBe(true)

      expect(mockItems).toEqual(mockItems)
    })

    it('adds a new item with the correct index based on existing items', () => {
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

      const updatedItems = addItem({ items: mockItems, lineId })

      expect(
        updatedItems.get(lineId)?.find((item) => item.text === 'newItem')
          ?.position.index,
      ).toBe(1)
    })

    it('adds a new item with index 0 if no existing items on the line', () => {
      const mockItems = new Map() // Empty map

      const lineId = 1

      const updatedItems = addItem({ items: mockItems, lineId })

      expect(
        updatedItems.get(lineId)?.find((item) => item.text === 'newItem')
          ?.position.index,
      ).toBe(0) // New item has index 0
    })
  })

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
      expect(
        updatedItems.get(lineId)?.every((item) => item.id !== itemId),
      ).toBe(true)

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
})
