import { css } from '@emotion/react';

interface ButtonProps {
  children: React.ReactNode;
  type: ButtonType;
  margin: string;
}

type ButtonType = 'primary' | 'secondary';

function Button({ children, type, margin }: ButtonProps) {
  return (
    <button type="button" css={buttonStyle(type, margin)}>
      <span css={fontStyle}>
        {type === 'primary' ? children : <strong>{children}</strong>}
      </span>
    </button>
  );
}

const buttonStyle = (type: ButtonType, margin: string) => css`
  padding: 17px 0;
  margin: ${margin};
  background-color: ${type === 'primary' ? 'black' : 'white'};
  color: ${type === 'primary' ? 'white' : 'black'};
  border: ${type === 'primary' ? 'none' : '2px solid black'};
  border-radius: 6px;

  cursor: pointer;
`;

const fontStyle = css`
  font-size: 15px;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
`;

export default Button;
