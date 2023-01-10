import { css } from '@emotion/react';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  priority: ButtonPriority;
  margin: string;
  onClickHandler?: React.MouseEventHandler | React.FormEventHandler;
}

type ButtonPriority = 'primary' | 'secondary';

function Button({
  children,
  type,
  priority,
  margin,
  onClickHandler,
}: ButtonProps) {
  return (
    <button
      type={type}
      css={buttonStyle(priority, margin)}
      onClick={onClickHandler}
    >
      <span css={fontStyle}>
        {priority === 'primary' ? children : <strong>{children}</strong>}
      </span>
    </button>
  );
}

const buttonStyle = (priority: ButtonPriority, margin: string) => css`
  padding: 17px 0;
  margin: ${margin};
  background-color: ${priority === 'primary' ? 'black' : 'white'};
  color: ${priority === 'primary' ? 'white' : 'black'};
  border: ${priority === 'primary' ? 'none' : '2px solid black'};
  border-radius: 6px;

  cursor: pointer;
`;

const fontStyle = css`
  font-size: 15px;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
`;

export default Button;
