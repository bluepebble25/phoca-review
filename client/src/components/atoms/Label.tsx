import { css } from '@emotion/react';

interface LabelProps {
  name: string;
  labelName: string;
}

function Label({ name, labelName }: LabelProps) {
  return (
    <label htmlFor={name} css={labelStyle}>
      <strong>{labelName}</strong>
    </label>
  );
}

const labelStyle = css`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 12px;
`;

export default Label;
