import { css } from '@emotion/react';
import React from 'react';
import FlipButton from '../atoms/Buttons/FlipButton';
import Card from '../atoms/Card';
import CardFlipLabel from '../atoms/CardFlipLabel';

interface CardPreviewProps {
  cardInfo: {
    title: string;
    author: string;
  };
  cardContents: {
    contentsFront: string;
    contentsBack: string;
  };
  isCardFront: boolean;
  onClickCardToggle: React.MouseEventHandler<HTMLSpanElement>;
}

function CardPreview({
  cardInfo,
  cardContents,
  isCardFront,
  onClickCardToggle,
}: CardPreviewProps) {
  return (
    <div css={cardPreviewStyle}>
      <Card
        isCardFront={isCardFront}
        cardInfo={cardInfo}
        cardContents={cardContents}
      />
      <div css={flipTooAreaStyle}>
        <CardFlipLabel isCardFront={isCardFront} onClick={onClickCardToggle} />
        <div css={buttonWrapperStyle}>
          <FlipButton buttonSize={28} onClick={onClickCardToggle} />
        </div>
      </div>
    </div>
  );
}

const cardPreviewStyle = css`
  width: 48%;
`;

const flipTooAreaStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const buttonWrapperStyle = css`
  position: absolute;
  top: -5px;
  right: 18px;
`;

export default CardPreview;
