import styled from 'styled-components'

export const ModalContainer = styled.div<{
  $isVisible?: boolean
  $zIndex?: number
}>`
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ $zIndex }) => (typeof $zIndex === 'number' ? $zIndex : 100)};
  overflow-x: hidden;
  transition: opacity 250ms 700ms ease;

  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`

export const OutsideBackground = styled(ModalContainer)`
  background-color: var(--text);
  opacity: 0.85;
  z-index: 150;
`
