import useFilterStore from '@/store/filterStore'
import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'

const FilterWrapper = styled.div`
  background-color: var(--background-secondary);
  border-radius: 5px;
`

const FilterBlock = () => {
  const { textFilter, setTextFilter } = useFilterStore()

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
    </FilterWrapper>
  )
}

export default FilterBlock
