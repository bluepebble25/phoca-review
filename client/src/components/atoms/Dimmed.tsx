import { css } from '@emotion/react';

function Dimmed() {
  return <div css={dimmedStyle}></div>;
}

const dimmedStyle = css`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.9;
`;

export default Dimmed;
