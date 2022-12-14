import { css } from '@emotion/react';

interface CardProps {
  cardInfo: {
    title: string;
    author: string;
  };
  cardContents: {
    contentsFront: string;
    contentsBack: string;
  };
  isCardFront: boolean;
}

interface CardFaceProps {
  faceType: 'front' | 'back';
  cardInfo: {
    title: string;
    author: string;
  };
  cardContents: string;
}

const CardFace: React.FC<CardFaceProps> = ({
  faceType,
  cardInfo,
  cardContents,
}) => {
  return (
    <div css={[cardFaceStyle, faceType === 'front' ? frontStyle : backStyle]}>
      <div css={titleStyle}>
        {/* 36자 제한 */}
        {cardInfo.title}
      </div>
      <p css={contentsStyle}>
        {/* 198자 제한 */}
        {cardContents}
      </p>
      {/* 17자 제한 */}
      <div css={authorStyle}>{cardInfo.author}</div>
    </div>
  );
};

function Card({ cardInfo, cardContents, isCardFront }: CardProps) {
  return (
    <div css={sceneStyle}>
      <div css={cardStyle(isCardFront)}>
        <CardFace
          faceType="front"
          cardInfo={cardInfo}
          cardContents={cardContents.contentsFront}
        />
        <CardFace
          faceType="back"
          cardInfo={cardInfo}
          cardContents={cardContents.contentsBack}
        />
      </div>
    </div>
  );
}

/* about card */
const sceneStyle = css`
  width: 280px;
  height: 431px;
  perspective: 1500px;
`;

const cardStyle = (isCardFront: boolean) => css`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  border-radius: 10px;
  font-size: 1.5rem;
  transform: ${isCardFront ? 'none' : 'rotateY(-180deg)'};
`;

const cardFaceStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #d9d9d9;
  backface-visibility: hidden;
  padding: 30px 25px;
`;

const frontStyle = css`
  background-color: #de5246;
`;

const backStyle = css`
  background-color: royalblue;
  transform: rotateY(180deg);
`;

/* about texts */
const titleStyle = css`
  margin-bottom: 23px;
`;

const contentsStyle = css`
  font-size: 1.6rem;
`;

const authorStyle = css`
  position: absolute;
  right: 25px;
  bottom: 30px;
  text-align: right;
  margin-top: 24px;
`;

export default Card;
