import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ArrowButton from '../atoms/ArrowButton';
import Cover from '../molecules/Cover';
import Paper from './Paper';
import data from '../../data/dummydata';

function Book() {
  const [cardList, setCardList] = useState<any[]>([]);
  const [location, setLocation] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isCoversFlipped, setIsCoversFlipped] = useState([false, false]);
  const cardPerPage = 4; // 한 페이지당 보여지는 카드의 수
  const totalCardNum = 19;
  // let numOfPapers = Math.ceil(totalCardNum / (cardPerPage * 2));
  let numOfPapers = 3;
  let maxLocation = numOfPapers + 2;

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    let fetchedCards = data.slice(0, 19);
    let splitedResult: any = [];
    // 나중에는 {page: 1, cards: [{},{},...]} 식으로 미리 8개 단위로 쪼갠 데이터를 보내도록 서버 코드를 바꿔야겠음
    for (let i = 1; i <= numOfPapers; i++) {
      let chunkPerPaper = {
        page: i,
        isFlipped: false,
        zIndex: numOfPapers - i + 1,
        cardData: [
          fetchedCards.slice(
            (i - 1) * cardPerPage * 2,
            (i - 1) * cardPerPage * 2 + 4
          ),
          fetchedCards.slice(
            i * cardPerPage * 2 - cardPerPage,
            i * cardPerPage * 2
          ),
        ],
      };
      splitedResult.push(chunkPerPaper);
    }
    console.log('splitedResult', splitedResult);
    setCardList(splitedResult);
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
      } else {
        const toggledArr = cardList.map((cards) =>
          cards.page === location
            ? { ...cards, isFlipped: !cards.isFlipped, zIndex: location }
            : cards
        );
        setCardList(toggledArr);
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
        const toggledArr = cardList.map((cards) =>
          cards.page === location - 1
            ? { ...cards, isFlipped: !cards.isFlipped, zIndex: -cards.page }
            : cards
        );
        setCardList(toggledArr);
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
          {cardList.map((cards, i) => {
            return (
              <Paper
                key={cards.page}
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
    </div>
  );
}

const containerStyle = css`
  height: 100vh;
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
