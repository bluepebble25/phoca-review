import { css } from '@emotion/react';
import { cardRefsType } from '../../pages/CardDetailPage';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import { shadow } from '../../_lib/styles/effectPalette';

interface CardCustomType {
  type: string;
  value: string;
  fontColor: string;
}

interface CardProps {
  cardRefs?: cardRefsType;
  cardCustomFront: CardCustomType;
  cardCustomBack: CardCustomType;
  cardInfo: {
    title: string;
    author: string;
  };
  cardContents: {
    front: string;
    back: string;
  };
  isCardFront: boolean;
}

interface CardFaceProps {
  cardRefs?: cardRefsType;
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
  cardRefs,
  cardCustomFront,
  cardCustomBack,
  faceType,
  cardInfo,
  cardContents,
}) => {
  return (
    <div
      ref={cardRefs && (faceType === 'front' ? cardRefs.front : cardRefs.back)}
      css={[
        cardFaceStyle(
          faceType === 'front' ? cardCustomFront! : cardCustomBack!
        ),
        faceType === 'back' ? backStyle : {},
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
  cardRefs,
  cardCustomFront,
  cardCustomBack,
  cardInfo,
  cardContents,
  isCardFront,
}: CardProps) {
  return (
    <div css={sceneStyle}>
      <div css={cardStyle(isCardFront)}>
        <CardFace
          cardRefs={cardRefs}
          cardCustomFront={cardCustomFront}
          faceType="front"
          cardInfo={cardInfo}
          cardContents={cardContents.front}
        />
        <CardFace
          cardRefs={cardRefs}
          cardCustomBack={cardCustomBack}
          faceType="back"
          cardInfo={cardInfo}
          cardContents={cardContents.back}
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
  transform: ${isCardFront ? 'none' : 'rotateY(-180deg)'};

  border-radius: 10px;
  box-shadow: ${shadow.dropShadow};
  font-size: 1.5rem;
`;

interface CardCustomType {
  type: string;
  value: string;
  fontColor: string;
}

const cardFaceStyle = ({ type, value, fontColor }: CardCustomType) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30px 25px;
  border-radius: 10px;
  backface-visibility: hidden;

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

const backStyle = css`
  transform: rotateY(180deg);
`;

/* about texts */
const titleStyle = css`
  margin-bottom: 23px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  word-wrap: break-word;
`;

const contentsStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  overflow: hidden;

  white-space: pre-line;
  word-wrap: break-word;
  font-size: 1.6rem;
`;

const authorStyle = css`
  position: absolute;
  right: 25px;
  bottom: 30px;
  text-align: right;
  margin-top: 24px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  word-break: break-all;
`;

export default Card;
