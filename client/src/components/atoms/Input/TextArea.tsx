import { css } from '@emotion/react';
import Label from '../Label';
import { inputStyle } from './Input';

interface TextAreaProps {
  name: string;
  labelName: string;
  rows: number;
  cols: number;
  maxLength: number;
  value: string;
  onChangeContents: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyUpContents: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

function TextArea({
  name,
  labelName,
  rows,
  cols,
  maxLength,
  value,
  onChangeContents,
  onKeyUpContents,
}: TextAreaProps) {
  return (
    <div>
      <Label name={name} labelName={labelName} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        value={value}
        onChange={onChangeContents}
        onKeyUp={onKeyUpContents}
        css={[inputStyle, textAreaStyle]}
      />
    </div>
  );
}

const textAreaStyle = css`
  height: 30rem;
  padding: 16px;
  resize: none;
`;

export default TextArea;
