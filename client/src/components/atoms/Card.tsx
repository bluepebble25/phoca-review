import { css } from '@emotion/react';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';

interface CardCustomType {
  type: string;
  value: string;
  fontColor: string;
}

interface CardProps {
  cardCustomFront: CardCustomType;
  cardCustomBack: CardCustomType;
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
  cardCustomFront?: CardCustomType;
  cardCustomBack?: CardCustomType;
  faceType: 'front' | 'back';
  cardInfo: {
    title: string;
    author: string;
  };
  cardContents: string;
}

const CardFace: React.FC<CardFaceProps> = ({
  cardCustomFront,
  cardCustomBack,
  faceType,
  cardInfo,
  cardContents,
}) => {
  return (
    <div
      css={[
        cardFaceStyle,
        faceType === 'front'
          ? frontStyle(cardCustomFront!)
          : backStyle(cardCustomBack!),
      ]}
    >
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

function Card({
  cardCustomFront,
  cardCustomBack,
  cardInfo,
  cardContents,
  isCardFront,
}: CardProps) {
  console.log('카드', cardCustomFront);

  return (
    <div css={sceneStyle}>
      <div css={cardStyle(isCardFront)}>
        <CardFace
          cardCustomFront={cardCustomFront}
          faceType="front"
          cardInfo={cardInfo}
          cardContents={cardContents.contentsFront}
        />
        <CardFace
          cardCustomBack={cardCustomBack}
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

interface CardCustomType {
  type: string;
  value: string;
  fontColor: string;
}

const cardFaceStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  // background-color: #d9d9d9;
  backface-visibility: hidden;
  padding: 30px 25px;
`;

const frontStyle = ({ type, value, fontColor }: CardCustomType) => css`
  background-color: ${type === 'color'
    ? value.split('')[0] === '#'
      ? value
      : colorPalette[value]
    : '#FFFFFF'};
  background: ${type === 'gradient' && gradient[value]};
  color: ${fontColor ? colorPalette[fontColor] : '#000000'};
  ${type === 'image' && 'background-image: url("' + value + '")'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const backStyle = ({ type, value, fontColor }: CardCustomType) => css`
  background-color: ${type === 'color'
    ? value.split('')[0] === '#'
      ? value
      : colorPalette[value]
    : '#FFFFFF'};
  transform: rotateY(180deg);
  background: ${type === 'gradient' && gradient[value]};
  color: ${fontColor ? colorPalette[fontColor] : '#000000'};
  ${type === 'image' && 'background-image: url("' + value + '")'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
