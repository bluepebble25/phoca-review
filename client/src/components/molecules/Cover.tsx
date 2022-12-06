import { css } from '@emotion/react';

export interface CoverProps {
  order: 'first' | 'last';
  isFlipped: boolean;
}

function Cover({ order, isFlipped }: CoverProps) {
  return <div css={coverStyle({ order, isFlipped })}></div>;
}

const coverStyle = ({ order, isFlipped }: CoverProps) => css`
  z-index: ${order === 'first'
    ? isFlipped
      ? '-1000'
      : '1000'
    : isFlipped
    ? '1000'
    : '-1000'};
  position: absolute;
  display: flex;
  width: 104%;
  height: 106%;
  top: -3%;
  ${isFlipped && 'transform: rotateY(-180deg);'}
  font-size: 30px;
  text-align: center;
  transform-origin: left;
  transition: transform 0.8s;

  background-color: #3e51b1;
  border-radius: 2px 10px 10px 2px;
  box-shadow: 1px 1px 10px gray;
`;

export default Cover;
