import { css } from '@emotion/react';
import { shadow } from '../../../_lib/styles/effectPalette';

interface CircleButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  size: string;
  color: string;
}

function CircleButton({ children, size, color, onClick }: CircleButtonProps) {
  return (
    <button css={btnStyle(size, color)} onClick={onClick}>
      {children}
    </button>
  );
}

const btnStyle = (size: string, color: string) => css`
  width: ${size};
  height: ${size};
  background-color: ${color};
  cursor: pointer;
  border-radius: 50%;
  border: none;
  box-shadow: ${shadow.dropShadow};
`;

export default CircleButton;
