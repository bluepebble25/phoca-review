export function genNewPapers(
  fetchedCards: any[],
  paperListLen: number,
  totalPage: number,
  cardPerPage: number
) {
  let newPapersNum = Math.ceil(fetchedCards.length / (cardPerPage * 2));
  let newPaperList = [];

  for (let i = 1; i <= newPapersNum; i++) {
    let chunkPerPaper = {
      paper: paperListLen + i,
      isFlipped: false,
      zIndex: totalPage - paperListLen - i + 1,
      cardData: [
        fetchedCards.slice(
          (i - 1) * cardPerPage * 2,
          (i - 1) * cardPerPage * 2 + 4
        ),
        fetchedCards.slice((i * 2 - 1) * cardPerPage, i * cardPerPage * 2),
      ],
    };
    newPaperList.push(chunkPerPaper);
  }
  return newPaperList;
}

export function reorderCards(
  cardList: any[],
  paperList: any[],
  cardPerPage: number
) {
  let copiedPapers = paperList.slice();
  let result = copiedPapers.map((paper, i) => {
    let splited = [
      cardList.slice(i * cardPerPage * 2, i * cardPerPage * 2 + 4),
      cardList.slice(
        (i + 1) * cardPerPage * 2 - cardPerPage,
        (i + 1) * cardPerPage * 2
      ),
    ];
    paper.cardData = splited;
    return paper;
  });

  return result;
}
