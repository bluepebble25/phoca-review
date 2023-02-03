import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ArrowButton from '../atoms/ArrowButton';
import Cover from '../molecules/Cover';
import Paper from './Paper';
import CardApi from '../../_lib/api/CardApi';
import { Outlet } from 'react-router-dom';
import { genNewPapers } from '../../_lib/utils';

function Book() {
  const [cardList, setCardList] = useState<any[]>([]);
  const [paperList, setPaperList] = useState<any[]>([]);
  const [location, setLocation] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isCoversFlipped, setIsCoversFlipped] = useState([false, false]);
  const cardPerPage = 4; // 한 페이지당 보여지는 카드의 수

  const [totalCardNum, setTotalCardNum] = useState(-1);
  const [numOfPapers, setNumOfPapers] = useState(0);
  const [maxLocation, setMaxLocation] = useState(0);

  useEffect(() => {
    fetchCards(1);
  }, []);

  useEffect(() => {
    // 만약 장(paper) 번호가 4의 배수이고, 마지막 페이지가 아니며, 다음 페이지에 해당하는 데이터가 아직 안불려온 경우 fetch
    // (종이의 수가 4의 배수라는 것은 API에서 한번에 오는 데이터의 크기인 32를 cardPerPage * 2로 나눈 값)
    if (
      paperList.length % 4 === 0 &&
      paperList.length !== numOfPapers &&
      paperList.length === location
    ) {
      fetchCards(location / 4 + 1);
    }
  }, [location]);

  const fetchCards = async (page: number) => {
    const res = await CardApi.getAllCards(page);
    let fetchedCards = res.data.results; // 최대 32개의 카드 데이터
    setCardList([...cardList, fetchedCards]);

    let totalCard = parseInt(res.headers['x-total-count']!);
    let totalPage = Math.ceil(totalCard / (cardPerPage * 2));

    if (totalCard !== totalCardNum) {
      setTotalCardNum(totalCard);
      setNumOfPapers(totalPage);
      setMaxLocation(totalPage + 2);
    }

    const newPaperList = genNewPapers(
      fetchedCards,
      paperList.length,
      totalPage,
      cardPerPage
    );

    setPaperList([...paperList, ...newPaperList]);
  };

  const onClickNextButton = () => {
    goNextPage();
  };

  const onClickPrevButton = () => {
    goPrevPage();
  };

  function goNextPage() {
    if (location < maxLocation) {
      if (location === 0) {
        setIsBookOpen(true);
        setIsCoversFlipped([!isCoversFlipped[0], isCoversFlipped[1]]);
      } else if (location === numOfPapers + 1) {
        setIsBookOpen(false);
        setIsCoversFlipped([isCoversFlipped[0], !isCoversFlipped[1]]);
      } else if (
        paperList.length % 4 === 0 &&
        paperList.length !== numOfPapers &&
        paperList.length === location
      ) {
        fetchCards(location / 2);
      } else {
        // 페이지 넘기는 함수
        const toggleArr = () => {
          return paperList.map((cards) =>
            cards.paper === location
              ? { ...cards, isFlipped: !cards.isFlipped, zIndex: -cards.zIndex }
              : cards
          );
        };
        setPaperList(toggleArr());
      }
      setLocation(location + 1);
    }
  }

  function goPrevPage() {
    if (location > 0) {
      if (location === 1) {
        setIsBookOpen(false);
        setIsCoversFlipped([!isCoversFlipped[0], isCoversFlipped[1]]);
      } else if (location === maxLocation) {
        setIsBookOpen(true);
        setIsCoversFlipped([isCoversFlipped[0], !isCoversFlipped[1]]);
      } else {
        const toggledArr = paperList.map((cards) =>
          cards.paper === location - 1
            ? { ...cards, isFlipped: !cards.isFlipped, zIndex: -cards.zIndex }
            : cards
        );
        setPaperList(toggledArr);
      }
      setLocation(location - 1);
    }
  }

  return (
    <div css={containerStyle}>
      <ArrowButton
        icon={faArrowLeft}
        type="prev"
        isBookOpen={isBookOpen}
        onClick={onClickPrevButton}
      />

      {/* <!-- Book --> */}
      <div css={sceneStyle}>
        <div css={bookStyle(isBookOpen, isCoversFlipped[1])}>
          <Cover order="first" isFlipped={isCoversFlipped[0]} />
          {paperList.map((cards) => {
            return (
              <Paper
                key={cards.paper}
                cardList={cards.cardData}
                isFlipped={cards.isFlipped}
                zIndex={cards.zIndex}
              />
            );
          })}
          <Cover order="last" isFlipped={isCoversFlipped[1]} />
        </div>
      </div>

      <ArrowButton
        icon={faArrowRight}
        type="next"
        isBookOpen={isBookOpen}
        onClick={onClickNextButton}
      />

      <Outlet />
    </div>
  );
}

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const sceneStyle = css`
  perspective: 1500px;
`;
const bookStyle = (isBookOpen: boolean, isMoveToCenter: boolean) => css`
  position: relative;
  width: 366px;
  height: 526px;
  transform-style: preserve-3d;
  ${isBookOpen && 'transform: translateX(50%);'}
  ${isMoveToCenter && 'transform: translateX(104%);'}
`;

export default Book;
