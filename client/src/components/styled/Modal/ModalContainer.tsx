import { PropsWithChildren } from 'react'
import { ModalWrapper } from './ModalWrapper'
import { OutsideBackground } from './OutsideBackground'
import { ContentWrapper } from './ContentWrapper'

interface IProps {
  isModalShown: boolean
  onClick?: VoidFunction
}

export const ModalContainer = ({
  isModalShown,
  children,
  onClick,
}: PropsWithChildren<IProps>) => {
  return (
    <ModalWrapper $isVisible={isModalShown}>
      <OutsideBackground $isVisible={isModalShown} onClick={onClick} />
      <ContentWrapper>{children}</ContentWrapper>
    </ModalWrapper>
  )
}
