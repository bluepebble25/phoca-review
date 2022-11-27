import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

interface logoStyleProps {
  padding?: string;
}

function Logo({ padding }: logoStyleProps) {
  return (
    <h1 css={headerStyle(padding)}>
      <Link to="/cards">
        <span css={logoStyle}>Phoca Review</span>
      </Link>
    </h1>
  );
}

const headerStyle = (padding: string | undefined) => css`
  display: inline-block;
  padding: ${padding};
  font-size: 0;
`;

const logoStyle = css`
  font-size: 24px;
  font-family: 'Roboto Black Italic';
`;

export default Logo;
