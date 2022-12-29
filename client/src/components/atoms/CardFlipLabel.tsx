import { css } from '@emotion/react';

interface CardFlipLabelProps {
  isCardFront: boolean;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

function CardFlipLabel({ isCardFront, onClick }: CardFlipLabelProps) {
  return (
    <div css={labelContainerStyle}>
      <span id="frontLabel" onClick={onClick} css={textStyle(isCardFront)}>
        앞
      </span>
      <span css={dashStyle}>/</span>
      <span id="backLabel" css={textStyle(!isCardFront)} onClick={onClick}>
        뒤
      </span>
    </div>
  );
}

const labelContainerStyle = css`
  margin-top: 15px;
  font-size: 1.6rem;
`;

const dashStyle = css`
  font-size: 1.4rem;
  margin: 0 10px;
  font-weight: 600;
`;

const textStyle = (isCardFront: boolean) => css`
  font-weight: 600;
  color: ${isCardFront ? 'black' : '#ACACAC'};
  cursor: pointer;
`;

export default CardFlipLabel;
