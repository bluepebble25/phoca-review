import { css } from '@emotion/react';
import { useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import Dimmed from '../components/atoms/Dimmed';
import Card from '../components/atoms/Card';
import CircleButton from '../components/atoms/Buttons/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { colorPalette } from '../_lib/styles/colorPalette';
import FlipButton from '../components/atoms/Buttons/FlipButton';
import useFetchCard from '../hooks/useFetchCard';
import useOnClickOutside from '../hooks/useOnClickOutside';

function CardDetailPage() {
  const [isCardFront, setIsCardFront] = useState(true);
  const [isFlipShown, setIsFlipShown] = useState(false);

  const params = useParams();
  const id = parseInt(params.id!);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/cards');
  };

  const card = useFetchCard(id);
  useOnClickOutside(modalRef, goBack);

  const onClickCardToggle = () => {
    setIsCardFront(!isCardFront);
  };

  const onMouseEnterCard = () => {
    setIsFlipShown(true);
  };

  const onMouseLeaveCard = () => {
    setIsFlipShown(false);
  };

  if (!card) {
    return (
      <div css={containerStyle}>
        <Dimmed />
      </div>
    );
  } else {
    return (
      <div css={containerStyle}>
        <Dimmed />
        <div css={modalStyle} ref={modalRef}>
          <div
            css={cardAreaStyle}
            onMouseEnter={onMouseEnterCard}
            onMouseLeave={onMouseLeaveCard}
          >
            <div css={flipBtnWrapperStyle(isFlipShown)}>
              <FlipButton buttonSize={35} onClick={onClickCardToggle} />
            </div>

            <Card
              cardCustomFront={card.cardCustomFront}
              cardCustomBack={card.cardCustomBack}
              cardInfo={card.cardInfo}
              cardContents={card.cardContents}
              isCardFront={isCardFront}
            />
          </div>

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
              <Link to={`/edit/cards/${id}`}>
                <CircleButton size="46px" color={colorPalette.orangeYellow}>
                  <FontAwesomeIcon
                    icon={faPen}
                    fontSize="24px"
                    color={colorPalette.white}
                  />
                </CircleButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
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

const cardAreaStyle = css`
  position: relative;
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: space-between;
`;

const rightGroupStyle = css`
  display: flex;
  gap: 16px;
`;

const flipBtnWrapperStyle = (isFlipShown: boolean) => css`
  display: ${isFlipShown ? 'block' : 'none'};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export default CardDetailPage;
