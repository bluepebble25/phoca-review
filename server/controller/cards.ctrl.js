const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

const { CardSchema } = require('../models/Card');

// controllers
const getAllCards = (req, res) => {
  // 1. json 카드 정보를 담은 디렉토리 uploads/card_info를 읽어온다.
  // 2. 파일 목록을 돌며 제목에 있는 id를 추출해 정렬한다.
  // 3. 정렬된 배열을 limit 수만큼 slice해서 json 배열 형태로 보낸다.
  // 4. 현재는 id 순으로 내보내지만 음악 재생목록처럼 유저가 직접 편집한 순서대로 보여주는 기능을 추가한다면
  //    card_order라는 json 파일에 배열 형태로 카드의 id를 저장해 그 순서대로 내보내게 수정할 예정
  req.query.limit = req.query.limit || 36;
  const limit = parseInt(req.query.limit);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  let cards = [];

  fs.readdir('uploads/card_info/', (err, files) => {
    console.log('files1: ', files);
    files.sort((a, b) => {
      return a.split('-')[0] - b.split('-'[0]); // 오름차순 정렬
    });
    console.log('files: ', files);
    const fileList = files.splice(0, limit);

    console.log('fileList: ', fileList);

    fileList.forEach((file, i) => {
      cards.push(
        JSON.parse(
          fs.readFileSync('uploads/card_info/' + file, function (err) {
            '파일을 읽는데 실패했습니다.';
          })
        )
      );
    });
    console.log('카드: ', cards);
    res.json(cards);
  });
};

const getCard = (req, res) => {
  // 1. params에서 id를 가져온다.
  // 2. card_info의 json 파일을 돌아가며 이름을 '-'으로 split해서 앞의 숫자가 id와 일치하는 파일을 읽어들인다.
  // 3. json 정보 전송
  const id = parseInt(req.params.id);
  const fileList = fs.readdirSync('uploads/card_info/');
  console.log(fileList);
  const cardFile = fileList.filter(
    (file) => parseInt(file.split('-')[0]) === id
  );

  console.log(cardFile[0]);
  const card_info = JSON.parse(
    fs.readFileSync('uploads/card_info/' + cardFile[0])
  );
  console.log(card_info);
  res.json(card_info);
};

const createCard = (req, res) => {
  const cardInfo = JSON.parse(req.body.jsonObject);
  const isValid = ajv.validate(CardSchema, cardInfo);

  console.log(JSON.parse(req.body.jsonObject));
  console.log(req.files);
  console.log(isValid);

  if (!isValid) {
    res.send('유효하지 않은 형식입니다.').status(400);
  } else {
    let index = fs.readFileSync('uploads/index.txt');
    index = parseInt(index);
    fs.writeFileSync(
      `uploads/card_info/${index + 1}-${cardInfo.title}.json`,
      req.body.jsonObject
    );
    fs.writeFileSync('uploads/index.txt', `${index + 1}`);
    res.status(201);
  }
};

const updateCard = (req, res) => {};

const deleteCard = (req, res) => {};

module.exports = {
  getAllCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
