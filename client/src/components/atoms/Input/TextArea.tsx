import { css } from '@emotion/react';
import Label from '../Label';
import { inputStyle } from './Input';

interface TextAreaProps {
  name: string;
  labelName: string;
  rows: number;
  cols: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function TextArea({
  name,
  labelName,
  rows,
  cols,
  value,
  onChange,
}: TextAreaProps) {
  return (
    <div>
      <Label name={name} labelName={labelName} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        css={[inputStyle, textAreaStyle]}
      >
        {value}
      </textarea>
    </div>
  );
}

const textAreaStyle = css`
  height: 30rem;
  padding: 16px;
  resize: none;
`;

export default TextArea;
