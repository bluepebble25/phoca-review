import { css } from '@emotion/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import { shadow } from '../../_lib/styles/effectPalette';

interface Props {
  link?: string;
  id: number;
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

function CardUI({
  link,
  id,
  title,
  author,
  imageUrl,
  background,
  font,
}: Props) {
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
  }, [background]);

  return link ? (
    <Link to={`/cards/${id}`}>
      <div css={cardUIStyle}>
        <img src={imageUrl} alt="" css={imgStyle} />
        <div css={contentStyle(bgStyle, font)}>
          <h2 css={titleStyle}>{title}</h2>
          <p css={authorStyle}>{author}</p>
        </div>
      </div>
    </Link>
  ) : (
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
  box-shadow: ${shadow.dropShadow};
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
  font-size: 14px;
  max-width: 110px;
  margin: 10px;
  word-break: keep-all;
  word-wrap: break-word;
`;

const authorStyle = css`
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  max-width: 120px;
`;

export default React.memo(CardUI);
