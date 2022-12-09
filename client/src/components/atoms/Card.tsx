import { css } from '@emotion/react';

interface CardProps {
  isCardFront: boolean;
}

interface CardFaceProps {
  faceType: 'front' | 'back';
}

const CardFace: React.FC<CardFaceProps> = ({ faceType }) => {
  return (
    <div css={[cardFaceStyle, faceType === 'front' ? frontStyle : backStyle]}>
      <div css={titleStyle}>
        {/* 36자 제한 */}
        제목을 입력 해주세요 제목을 입력해주세요 제목을 입력해주세요 제목
      </div>
      <p css={contentsStyle}>
        {/* 198자 제한 */}
        국회는 국가의 예산안을 심의·확정한다. 각급 선거관리위원회의
        조직·직무범위 기타 필요한 사항은 법률로 정한다. 군인 또는 군무원이 아닌
        국민은 대한민국의 영역안에서는 중대한 군사상
        기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와
        비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.
        재판의 전심절차로서 행정심판을
      </p>
      {/* 17자 제한 */}
      <div css={authorStyle}>작가 감독을 입력 해주세요 안녕</div>
    </div>
  );
};

function Card({ isCardFront }: CardProps) {
  return (
    <div css={sceneStyle}>
      <div css={cardStyle(isCardFront)}>
        <CardFace faceType="front" />
        <CardFace faceType="back" />
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
  transition: transform 0.8s;
  transform-style: preserve-3d;
  border-radius: 10px;
  font-size: 1.5rem;
  transform: ${isCardFront ? 'none' : 'rotateY(180deg)'};
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
