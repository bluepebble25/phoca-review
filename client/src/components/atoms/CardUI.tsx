import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';

interface Props {
  title: string;
  content?: string;
  author: string;
  font: FontProps;
  imageUrl?: string;
  background?: {
    color?: string;
    gradient?: string;
  };
}

interface bgStyleProps {
  value: string;
  type: 'color' | 'gradient' | 'none';
}

interface FontProps {
  color: string;
}

function CardUI({ title, content, author, imageUrl, background, font }: Props) {
  const [bgStyle, setBgStyle] = useState<bgStyleProps>({
    value: '',
    type: 'none',
  });

  useEffect(() => {
    const getHexColor = (color: string) => {
      let hexColorCode = color;
      if (color.split('')[0] !== '#') {
        hexColorCode = colorPalette[color];
      }
      return hexColorCode;
    };

    if (background && background.color) {
      setBgStyle({ value: getHexColor(background.color), type: 'color' });
    } else if (background && background.gradient) {
      setBgStyle({ value: gradient[background.gradient], type: 'gradient' });
    }
  }, [background, bgStyle]);

  return (
    <div css={cardUIStyle}>
      <img src={imageUrl} alt="" css={imgStyle} />
      <div css={contentStyle(bgStyle, font)}>
        <h2 css={titleStyle}>{title}</h2>
        <p css={authorStyle}>{author}</p>
      </div>
    </div>
  );
}

const cardUIStyle = css`
  position: relative;
  width: 147px;
  height: 227px;
  border-radius: 10px;
  background-color: #d9d9d9;
  overflow: hidden;
`;

const imgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const contentStyle = ({ value, type }: bgStyleProps, font: FontProps) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  ${type === 'color' && 'background-color:' + value + ';'}
  ${type === 'gradient' && 'background:' + value + ';'}
  color: ${font.color};
`;

const titleStyle = css`
  font-size: 18px;
  max-width: 100px;
`;

const authorStyle = css``;

export default CardUI;
