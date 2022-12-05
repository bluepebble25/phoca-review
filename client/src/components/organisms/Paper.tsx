import { paperStyle, pageStyle, contentStyle } from '../../styles/book';
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
    <div css={paperStyle({ zIndex, isFlipped })}>
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

export default Paper;
