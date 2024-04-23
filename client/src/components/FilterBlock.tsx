import useFilterStore from '@/store/filterStore'
import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import Checkbox from './styled/Checkbox'
import { TShape } from '@/types/INodeItem'

const FilterWrapper = styled.div`
  height: 50px;
  background-color: var(--background-secondary);
  border-radius: 5px;
  padding: 10px;
`

const checkboxes: Array<TShape> = ['rectangle', 'oval', 'rhombus']

const FilterBlock = () => {
  const { textFilter, filterByShape, setTextFilter, setShapeFilter } =
    useFilterStore()

  const handleTextInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTextFilter(e.target.value)
    },
    [setTextFilter],
  )

  return (
    <FilterWrapper>
      <input
        placeholder='write text to filter'
        value={textFilter}
        onChange={handleTextInputChange}
      />
      <div>
        {checkboxes.map((checkbox) => {
          return (
            <Checkbox
              key={checkbox}
              checked={filterByShape.includes(checkbox)}
              label={`Show ${checkbox}`}
              onChange={() => setShapeFilter(checkbox)}
            />
          )
        })}
      </div>
    </FilterWrapper>
  )
}

export default FilterBlock
