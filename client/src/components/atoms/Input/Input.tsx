import { css } from '@emotion/react';
import Label from '../Label';

interface InputProps {
  name: string;
  labelName: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({ name, labelName, value, onChange }: InputProps) {
  return (
    <div>
      <Label name={labelName} labelName={labelName} />
      <input
        id={name}
        type="text"
        name={name}
        onChange={onChange}
        css={inputStyle}
        value={value}
      />
    </div>
  );
}

export const inputStyle = css`
  width: 100%;
  height: 48px;
  max-width: 343px;
  font-size: 1.6rem;
  border: 2px solid black;
  padding-left: 16px;
  outline: none;
  font-family: inherit;
`;

export default Input;
