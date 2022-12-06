import { css } from '@emotion/react';
import CardUI from '../atoms/CardUI';

interface PaperInfoProps {
  cardList: Array<Array<CardProps>>;
  zIndex: string;
  isFlipped: boolean;
}

interface CardProps {
  id: number;
  title: string;
  author: string;
  front: CardDetailProps;
  back: CardDetailProps;
  date: string;
}

interface CardDetailProps {
  content: string;
  background: {
    color?: string;
    gradient?: string;
  };
  image: {
    url: string;
    translate: Array<Number>;
  };
  text: {
    color: string;
    size?: string;
  };
}

function Paper({ cardList, zIndex, isFlipped }: PaperInfoProps) {
  return (
    <div css={paperStyle(zIndex, isFlipped)}>
      <div css={pageStyle('front')}>
        <div css={contentStyle}>
          {cardList[0].map((card, i) => {
            return (
              <CardUI key={card.id} title={card.title} author={card.author} />
            );
          })}
        </div>
      </div>

      <div css={pageStyle('back')}>
        <div css={contentStyle}>
          {cardList[1].map((card, i) => {
            return (
              <CardUI key={card.id} title={card.title} author={card.author} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const paperStyle = (zIndex: string, isFlipped: boolean) => css`
  position: absolute;
  z-index: ${Number(zIndex)};
  width: 100%;
  height: 100%;
  transform-origin: left;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${isFlipped && 'transform: rotateY(-180deg);'}
`;

const pageStyle = (face: 'front' | 'back') => css`
  display: flex;
  justify-content: center;
  align-items: start;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: ${face === 'back' && 'rotateY(180deg)'};
`;

const contentStyle = css`
  padding-top: 24px;
  width: 318px;
  height: 227px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 24px;
`;

export default Paper;
