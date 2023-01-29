import { css } from '@emotion/react';

interface DimmedProps {
  detailDimmedRef: React.RefObject<HTMLDivElement>;
}

function Dimmed({ detailDimmedRef }: DimmedProps) {
  return <div css={dimmedStyle} ref={detailDimmedRef}></div>;
}

const dimmedStyle = css`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.9;
`;

export default Dimmed;
