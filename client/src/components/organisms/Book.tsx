import { useEffect, useState } from 'react';
import { sceneStyle, bookStyle, coverStyle } from '../../styles/book';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ArrowButton from '../atoms/ArrowButton';
import Cover from '../molecules/Cover';
import Paper from './Paper';
import data from '../../data/dummydata';

function Book() {
  const [cardList, setCardList] = useState<any[]>([]);
  const [location, setLocation] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
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

  const onClickNextButton = () => {};

  const onClickPrevButton = () => {};

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ArrowButton icon={faArrowLeft} type="prev" onClick={onClickPrevButton} />

      {/* <!-- Book --> */}
      <div css={sceneStyle}>
        <div css={bookStyle}>
          {/* <Cover order="first" /> */}
          {cardList.map((cards, i) => {
            return (
              <Paper
                key={cards.page}
                cardList={cards.cardData}
                isFlipped={cards.cardData.isFlipped}
                zIndex={`${numOfPapers - cards.page + 1}`}
              />
            );
          })}
          <Cover order="last" />
          <div css={coverStyle('last')}></div>
        </div>
      </div>

      <ArrowButton
        icon={faArrowRight}
        type="next"
        onClick={onClickNextButton}
      />
    </div>
  );
}

export default Book;
