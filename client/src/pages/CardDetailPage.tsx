import { css } from '@emotion/react';
import React, { useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import html2canvas from 'html2canvas';

import Dimmed from '../components/atoms/Dimmed';
import Card from '../components/atoms/Card';
import CircleButton from '../components/atoms/Buttons/CircleButton';
import FlipButton from '../components/atoms/Buttons/FlipButton';
import ConfirmModal from '../components/molecules/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { colorPalette } from '../_lib/styles/colorPalette';
import useFetchCard from '../hooks/useFetchCard';
import useOnClickElement from '../hooks/useOnClickElement';
import CardApi from '../_lib/api/CardApi';
import { downloadFile } from '../_lib/utils';

export type cardRefsType = {
  front: React.RefObject<HTMLDivElement>;
  back: React.RefObject<HTMLDivElement>;
};

function CardDetailPage() {
  const [isCardFront, setIsCardFront] = useState(true);
  const [isFlipShown, setIsFlipShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const params = useParams();
  const id = parseInt(params.id!);
  const card = useFetchCard(id);

  /* Card 이미지 capture 영역 지정하기 위한 ref  */
  const cardFrontRef = useRef(null);
  const cardBackRef = useRef(null);
  const cardRefs: cardRefsType = { front: cardFrontRef, back: cardBackRef };

  /* Modal의 dimmed 부분을 클릭하면 닫는 로직 */
  const detailDimmedRef = useRef<HTMLDivElement>(null);
  const modalDimmedRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/cards');
  };

  useOnClickElement(detailDimmedRef, goBack);
  useOnClickElement(modalDimmedRef, () => {
    setIsModalShown(!isModalShown);
  });

  /* handler functions */
  const onDeleteCardHandler: Function = useOutletContext();

  const onClickCardToggle = () => {
    setIsCardFront(!isCardFront);
  };

  const onMouseEnterCard = () => {
    setIsFlipShown(true);
  };

  const onMouseLeaveCard = () => {
    setIsFlipShown(false);
  };

  const onClickDownload = () => {
    if (cardRefs.front.current && cardRefs.back.current) {
      const Front = cardRefs.front.current;
      const Back = cardRefs.back.current;

      /* html2canvas options 설명
        - allowTaint : CORS 이미지를 허용할 것인지 true/false
        - useCORS : CORS 이미지를 toDataURL() 할 수 있게 허용 true/false
        - backgroundColor : 뒷 배경의 색깔 지정. rgba(0,0,0,0)으로 투명하게
      */
      html2canvas(Front, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'rgba(0,0,0,0)',
      }).then((canvas) => {
        const img1URl = canvas.toDataURL('image/png');
        downloadFile(img1URl, `${id}-${card.cardInfo.title}_front`);
      });

      // 뒷면이 먼저 캡처되는 것 방지용 타이머
      setTimeout(() => {
        html2canvas(Back, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: 'rgba(0,0,0,0)',
        }).then((canvas) => {
          /*
            canvas에는 뒤집어진 뒷면이 캡쳐되어 있는 상태
            이 이미지 다시 뒤집어서 그릴 새 캔버스 생성
          */
          const flippedCanvas = document.createElement('canvas');
          flippedCanvas.width = canvas.width;
          flippedCanvas.height = canvas.height;
          flippedCanvas.style.display = 'none';
          document.body.appendChild(flippedCanvas);
          const ctx = flippedCanvas.getContext('2d');

          // canvas를 이미지화 해서 캔버스에 좌우반전해서 그림
          const img = new Image();
          img.src = canvas.toDataURL('image/png');
          img.onload = () => {
            ctx?.scale(-1, 1);
            ctx?.drawImage(img, img.width * -1, 0);
            const img2URl = flippedCanvas.toDataURL('image/png');
            downloadFile(img2URl, `${id}-${card.cardInfo.title}_back`);
            document.body.removeChild(flippedCanvas);
          };
        });
      }, 1);
    }
  };

  /* Rendering */
  if (!card) {
    return (
      <div css={containerStyle}>
        <Dimmed detailDimmedRef={detailDimmedRef} />
      </div>
    );
  } else {
    return (
      <div css={containerStyle}>
        <Dimmed detailDimmedRef={detailDimmedRef} />
        <ConfirmModal
          modalDimmedRef={modalDimmedRef}
          isModalShown={isModalShown}
          alertText="정말로 카드를 삭제하시겠습니까?"
          cancleText="취소"
          okText="삭제"
          cancleHandler={() => setIsModalShown(false)}
          okHandler={() => {
            CardApi.deleteCard(id);
            onDeleteCardHandler(id);
            navigate('/cards');
          }}
        />
        <div css={modalStyle}>
          <div
            css={cardAreaStyle}
            onMouseEnter={onMouseEnterCard}
            onMouseLeave={onMouseLeaveCard}
          >
            <div css={flipBtnWrapperStyle(isFlipShown)}>
              <FlipButton buttonSize={35} onClick={onClickCardToggle} />
            </div>

            <Card
              cardRefs={cardRefs}
              cardCustomFront={card.cardCustomFront}
              cardCustomBack={card.cardCustomBack}
              cardInfo={card.cardInfo}
              cardContents={card.cardContents}
              isCardFront={isCardFront}
            />
          </div>

          <div css={buttonGroupStyle}>
            <CircleButton
              size="46px"
              color={colorPalette.red}
              onClick={() => setIsModalShown(true)}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                fontSize="24px"
                color={colorPalette.white}
              />
            </CircleButton>
            <div css={rightGroupStyle}>
              <CircleButton
                size="46px"
                color={colorPalette.darkgray}
                onClick={onClickDownload}
              >
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
  z-index: 1000;
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
