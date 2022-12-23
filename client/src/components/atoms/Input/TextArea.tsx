import { css } from '@emotion/react';
import Label from '../Label';
import { inputStyle } from './Input';

interface TextAreaProps {
  name: string;
  labelName: string;
  rows: number;
  cols: number;
  value: string;
  onChangeContents: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function TextArea({
  name,
  labelName,
  rows,
  cols,
  value,
  onChangeContents,
}: TextAreaProps) {
  return (
    <div>
      <Label name={name} labelName={labelName} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChangeContents}
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
