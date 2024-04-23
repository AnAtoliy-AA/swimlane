import styled from 'styled-components'

interface IProps {
  checked: boolean
  label: string
  onChange: VoidFunction
}

const Checkbox = ({ checked, label, onChange }: IProps) => {
  return (
    <Styled onClick={onChange}>
      <input
        type='checkbox'
        checked={checked}
        aria-label={label}
        onChange={onChange}
      />
      <label>{label}</label>
    </Styled>
  )
}

export default Checkbox

const Styled = styled.div`
  display: inline-block;
  > input {
    opacity: 0;
  }
  > input + label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      width: 17px;
      height: 17px;
      border: 1px solid #aaa;
      background: #f8f8f8;
      border-radius: 3px;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -1px;
      left: 2px;
      font-size: 16px;
      color: #09ad7e;
      transition: all 0.2s;
    }
  }
  > input:not(:checked) + label {
    &:after {
      opacity: 0;
      transform: scale(0);
    }
  }
  > input:disabled:not(:checked) + label {
    &:before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #ddd;
    }
  }
  > input:checked + label {
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label,
  input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`
