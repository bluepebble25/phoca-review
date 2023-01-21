import { css } from '@emotion/react';
import { useEffect, useState, useRef, RefObject } from 'react';
import CardApi from '../_lib/api/CardApi';
import { useNavigate, useParams } from 'react-router-dom';

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
import useOnClickOutside from '../hooks/useOnClickOutside';

function CardDetailPage() {
  const [card, setCard] = useState<any>();
  const [isCardFront, setIsCardFront] = useState(true);
  const [isFlipShown, setIsFlipShown] = useState(false);
  const params = useParams();
  const id = parseInt(params.id!);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/cards');
  };
  useOnClickOutside(modalRef, goBack);

  const getCustom = (cardSide: any) => {
    let custom = { type: '', value: '' };
    const background = cardSide.background;
    if (cardSide.background) {
      custom = background.color
        ? { type: 'color', value: background.color }
        : { type: 'gradient', value: background.gradient };
    } else if (cardSide.image) {
      custom = {
        type: 'image',
        value: `http://localhost:5000/uploads/images/${cardSide.image.filename}`,
      };
    }
    return custom;
  };

  const onClickCardToggle = () => {
    setIsCardFront(!isCardFront);
  };

  const onMouseEnterCard = () => {
    setIsFlipShown(true);
  };

  const onMouseLeaveCard = () => {
    setIsFlipShown(false);
  };

  const fetchCard = async (id: number) => {
    const data = (await CardApi.getCard(id)).data;
    const { title, author, front, back } = data;
    const cardCustom = [getCustom(front), getCustom(back)];
    const card = {
      cardInfo: {
        title: title,
        author: author,
      },
      cardContents: {
        front: front.content,
        back: back.content,
      },
      cardCustomFront: {
        type: cardCustom[0].type,
        value: cardCustom[0].value,
        fontColor: front.font.color,
      },
      cardCustomBack: {
        type: cardCustom[1].type,
        value: cardCustom[1].value,
        fontColor: back.font.color,
      },
    };

    setCard(card);
  };

  useEffect(() => {
    fetchCard(id);
  }, []);

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
