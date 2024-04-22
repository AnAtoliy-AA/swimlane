import { ILine } from '@/types/ILine'

interface IProps {
  line: ILine
}

const Line = ({ line }: IProps) => {
  return (
    <>
      <p>{line.name}</p>
    </>
  )
}

export default Line
