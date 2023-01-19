import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
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
    filename: string;
  };
  font: {
    color: string;
  };
}

function Paper({ cardList, zIndex, isFlipped }: PaperInfoProps) {
  return (
    <div css={paperStyle(zIndex, isFlipped)}>
      <div css={pageStyle('front')}>
        <div css={contentStyle}>
          {cardList[0].map((card) => {
            return (
              <CardUI
                key={card.id}
                link={`/cards/${card.id}`}
                id={card.id}
                title={card.title}
                author={card.author}
                imageUrl={
                  card.front.image &&
                  card.front.image.filename &&
                  `http://localhost:5000/uploads/images/${card.front.image.filename}`
                }
                background={card.front.background}
                font={card.front.font}
              />
            );
          })}
        </div>
      </div>

      <div css={pageStyle('back')}>
        <div css={contentStyle}>
          {cardList[1].map((card) => {
            return (
              <CardUI
                key={card.id}
                link={`/cards/${card.id}`}
                id={card.id}
                title={card.title}
                author={card.author}
                imageUrl={
                  card.front.image &&
                  card.front.image.filename &&
                  `http://localhost:5000/uploads/images/${card.front.image.filename}`
                }
                background={card.front.background}
                font={card.front.font}
              />
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
