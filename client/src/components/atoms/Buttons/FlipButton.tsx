import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

interface FlipButtonProps {
  buttonSize: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function FlipButton({ onClick, buttonSize }: FlipButtonProps) {
  return (
    <button css={buttonStyle} onClick={onClick}>
      <FontAwesomeIcon
        icon={faRotateLeft}
        fontSize={buttonSize}
        css={iconStyle}
      />
    </button>
  );
}

const buttonStyle = () => css`
  padding: 8px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
`;

const iconStyle = css`
  text-shadow: 0 30px 10px rgba(0, 0, 0, 0.2);
  color: #545454;
  opacity: 80%;
`;

export default FlipButton;
