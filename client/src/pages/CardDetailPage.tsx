import { css } from '@emotion/react';
import {
  faDownload,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../components/atoms/Buttons/CircleButton';

import Card from '../components/atoms/Card';
import Dimmed from '../components/atoms/Dimmed';
import { colorPalette } from '../_lib/styles/colorPalette';

function CardDetailPage() {
  return (
    <div css={containerStyle}>
      <Dimmed />
      <div css={modalStyle}>
        <Card
          cardCustomFront={{
            type: 'color',
            value: colorPalette.yellow,
            fontColor: colorPalette.white,
          }}
          cardCustomBack={{
            type: 'color',
            value: colorPalette.green,
            fontColor: colorPalette.white,
          }}
          cardInfo={{
            title: 'Hi',
            author: 'world',
          }}
          cardContents={{
            front: 'abcdefg',
            back: 'hijklmnop',
          }}
          isCardFront={true}
        />
        <div css={buttonGroupStyle}>
          <CircleButton size="46px" color={colorPalette.red}>
            <FontAwesomeIcon
              icon={faTrashCan}
              fontSize="24px"
              color={colorPalette.white}
            />
          </CircleButton>

          <div css={rightGroupStyle}>
            <CircleButton size="46px" color={colorPalette.darkgray}>
              <FontAwesomeIcon
                icon={faDownload}
                fontSize="24px"
                color={colorPalette.white}
              />
            </CircleButton>
            <CircleButton size="46px" color={colorPalette.orangeYellow}>
              <FontAwesomeIcon
                icon={faPen}
                fontSize="24px"
                color={colorPalette.white}
              />
            </CircleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
`;

const modalStyle = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: space-between;
`;

const rightGroupStyle = css`
  display: flex;
  gap: 16px;
`;

export default CardDetailPage;
