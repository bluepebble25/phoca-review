import React from 'react';
import { css } from '@emotion/react';
import Book from '../components/organisms/Book';
import CircleButton from '../components/atoms/Buttons/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { colorPalette } from '../_lib/styles/colorPalette';
import { Link, Outlet } from 'react-router-dom';

function BookPage() {
  return (
    <div css={containerStyle}>
      <Book />
      <div css={btnWrapperStyle}>
        <Link to="/create">
          <CircleButton size="62px" color={colorPalette.green}>
            <FontAwesomeIcon icon={faPlus} color="white" fontSize="35px" />
          </CircleButton>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

const containerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const btnWrapperStyle = css`
  position: absolute;
  bottom: 60px;
  right: 100px;
`;

export default BookPage;
