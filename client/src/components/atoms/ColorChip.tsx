import { css } from '@emotion/react';
import { colorPalette } from '../../_lib/styles/colorPalette';

interface ColorChipProps {
  filling: string;
  borderExists: boolean;
}

function ColorChip({ filling, borderExists }: ColorChipProps) {
  let color = null;
  let image = null;
  let gradient = null;
  if (filling[0] === '#') {
    color = filling;
  } else if (filling.split('(').length === 2) {
    gradient = filling;
  } else {
    image = filling;
  }
  console.log(filling);
  return <div css={colorChipStyle(color, image, gradient, borderExists)}></div>;
}

const colorChipStyle = (
  color: string | null,
  image: string | null,
  gradient: string | null,
  borderExists: boolean
) => css`
  width: 34px;
  height: 34px;
  background-color: ${colorPalette.base};

  ${color && 'background-color: ' + color + ';'}
  ${image && 'background-image: url(' + image + ');'}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${gradient && 'background:' + gradient + ';'}

  ${borderExists && 'border: 2px solid black;'}
  border-radius: 6px;
  cursor: pointer;
`;

export default ColorChip;
