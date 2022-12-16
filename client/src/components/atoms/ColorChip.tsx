import { css } from '@emotion/react';
import { colorPalette } from '../../_lib/styles/colorPalette';

interface ColorChipProps {
  type: string;
  filling: string;
  colorName: string | undefined;
  borderExists: boolean;
  floatImage?: string;
}

function ColorChip({
  type,
  filling,
  colorName,
  borderExists,
  floatImage,
}: ColorChipProps) {
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

  return (
    <button
      type="button"
      value={colorName ? colorName : type === 'color' ? 'colorPicker' : 'image'}
      css={colorChipStyle(color, image, gradient, borderExists)}
    >
      {floatImage && <img src={floatImage} alt="" css={imageStyle} />}
    </button>
  );
}

const colorChipStyle = (
  color: string | null,
  image: string | null,
  gradient: string | null,
  borderExists: boolean
) => css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: ${colorPalette.base};

  ${color && 'background-color: ' + color + ';'}
  ${image && 'background-image: url(' + image + ');'}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${gradient && 'background:' + gradient + ';'}

  ${borderExists ? 'border: 2px solid black;' : 'border: none;'}
  border-radius: 6px;
  cursor: pointer;
`;

const imageStyle = css`
  position: absolute;
  width: 22px;
  height: 22px;
`;

export default ColorChip;
