import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

interface logoStyleProps {
  margin?: string;
  shouldBlockPage?: boolean;
}

function Logo({ margin, shouldBlockPage }: logoStyleProps) {
  const navigate = useNavigate();

  const preventGoBack = (e: React.MouseEvent) => {
    if (shouldBlockPage) {
      e.preventDefault();
      const result = window.confirm(
        '뒤로가기를 하면 현재 작성하고 있는 사항을 모두 잃게 되는데 괜찮겠어요?'
      );
      if (result) {
        navigate('/');
      }
    }
  };
  return (
    <h1 css={headerStyle(margin)}>
      <Link to="/cards" onClick={preventGoBack}>
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
