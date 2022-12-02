import { contentStyle, pageStyle, paperStyle } from '../../styles/book';
import CardUI from '../atoms/CardUI';

interface PaperInfoProps {
  cardList: Array<CardProps>;
  isFlipped: boolean;
}

interface CardProps {
  id: number;
  author: string;
  front: object;
  back: object;
}

function Paper({ cardList, isFlipped }: PaperInfoProps) {
  return (
    <div css={paperStyle({ isFlipped })}>
      <div css={pageStyle('front')}>
        <div css={contentStyle}>
          <CardUI title="cardList" />
          <CardUI title="안녕" />
          <CardUI title="반가워요" />
          <CardUI title="bye" />
        </div>
      </div>

      <div css={pageStyle('back')}>
        <div css={contentStyle}>
          <CardUI title="뒷면" />
          <CardUI title="반가워요" />
          <CardUI title="hi" />
          <CardUI title="bye" />
        </div>
      </div>
    </div>
  );
}

export default Paper;
