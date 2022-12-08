import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

interface logoStyleProps {
  margin?: string;
}

function Logo({ margin }: logoStyleProps) {
  return (
    <h1 css={headerStyle(margin)}>
      <Link to="/cards">
        <span css={logoStyle}>Phoca Review</span>
      </Link>
    </h1>
  );
}

const headerStyle = (margin: string | undefined) => css`
  display: inline-block;
  margin: ${margin};
  font-size: 0;
`;

const logoStyle = css`
  font-size: 24px;
  font-family: 'Roboto Black Italic';
`;

export default Logo;
