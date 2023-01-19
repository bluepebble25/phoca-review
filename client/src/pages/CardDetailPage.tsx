import { css } from '@emotion/react';

function CardDetailPage() {
  return <div css={containerStyle}></div>;
}

const containerStyle = css`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: black;
  opacity: 0.9;
`;

export default CardDetailPage;
