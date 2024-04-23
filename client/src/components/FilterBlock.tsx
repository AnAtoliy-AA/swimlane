import useFilterStore from '@/store/filterStore'
import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import Checkbox from './styled/Checkbox'

const FilterWrapper = styled.div`
  height: 50px;
  background-color: var(--background-secondary);
  border-radius: 5px;
  padding: 10px;
`

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
        <Checkbox
          checked={filterByShape.includes('rectangle')}
          label='Show rectangle'
          onChange={() => setShapeFilter('rectangle')}
        />
        <Checkbox
          checked={filterByShape.includes('oval')}
          label='Show oval'
          onChange={() => setShapeFilter('oval')}
        />
        <Checkbox
          checked={filterByShape.includes('rhombus')}
          label='Show rhombus'
          onChange={() => setShapeFilter('rhombus')}
        />
      </div>
    </FilterWrapper>
  )
}

export default FilterBlock
