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

  console.log('cardInfo', cardInfo);
  console.log('req.files', req.files);
  console.log(isValid);

  if (!isValid) {
    res.send('유효하지 않은 형식입니다.').status(400).end();
  } else {
    const filePath = [
      `uploads/images/${req.files[0].filename}` || '',
      `uploads/images/${req.files[1].filename}` || '',
    ];
    cardInfo.front.image.url = filePath[0];
    cardInfo.back.image.url = filePath[1];
    console.log('cardInfo', cardInfo);

    let index = fs.readFileSync('uploads/index.txt');
    index = parseInt(index);
    fs.writeFileSync(
      `uploads/card_info/${index + 1}-${cardInfo.title}.json`,
      JSON.stringify(cardInfo)
    );
    fs.writeFileSync('uploads/index.txt', `${index + 1}`);
    res.status(201).end();
  }
};

const updateCard = (req, res) => {
  // 1. req.params.id를 가져온다.
  // 2. 디렉토리 목록에서 해당 id를 가진 파일의 이름을 가져온다.
  // 3. req.body에서 수정 버전의 json object를 받아온다.
  // 4. 파일의 제목이 달라졌다면 파일 제목을 수정하고 내용은 받아온 json object로 덮어씌운다.
  const id = parseInt(req.params.id);
  const fileList = fs.readdirSync('uploads/card_info/');
  const filename = fileList.find((file) => {
    if (parseInt(file.split('-')[0]) === id) return file;
  });

  console.log(fileList);
  console.log('id:', id);
  console.log('filename:', filename);
  console.log('files', req.files);
  console.log('jsonObject', req.body.jsonObject);

  const card = JSON.parse(req.body.jsonObject);
  const isValid = ajv.validate(CardSchema, card);

  console.log('isValid', isValid);

  if (!isValid) {
    // 업로드된 이미지 삭제
    res.status(400).send('유효하지 않은 형식입니다.').end();
  } else {
    const savedInfo = JSON.parse(
      fs.readFileSync('uploads/card_info/' + filename)
    );
    console.log('savedInfo', savedInfo);
    console.log('req.files', req.files);

    /*
      원래 image 프로퍼티가 없었고 image 프로퍼티를 받았다면 이미지 업로드(업로드는 이미 됐으므로 url을 최신으로 교체)
      원래 image 프로퍼티가 있었고 image 프로퍼티 받았다면 교체
      원래 image 프로퍼티가 있었고 image 프로퍼티 안받았다면 삭제
    */
    // 받은 이미지가 이미지 0개, 1개, 2개일 때 고려
    // 교체할 새 이미지를 받았다면

    if (req.files && req.files.length !== 0) {
      const prevImages = [savedInfo.front.image.url, savedInfo.back.image.url];
      const currentImages = [card.front.image.url, card.back.image.url];

      prevImages.forEach((file) => {
        if (file !== undefined) {
          fs.unlinkSync(file);
          console.log('이미지 삭제 성공');
        }
      });

      const filePath = [
        `uploads/images/${req.files[0].filename}` || '',
        `uploads/images/${req.files[1].filename}` || '',
      ];
      card.front.image.url = filePath[0];
      card.back.image.url = filePath[1];
    }

    fs.writeFileSync(`uploads/card_info/${filename}`, JSON.stringify(card));

    // 이미지 파일 바꾸는 로직 작성해야 함
    // 이미지 API를 따로 분리하자.
    /* flow
      1. (updateCard) 클라이언트로부터 변경 정보를 전송받는다.
      2. (updateCard) 정보를 수정한다.
      3. (updateImg) 클라이언트가 이미지 업데이트 API를 호출하며 이미지를 전송한다.
      4. (updateImg) 이미지를 받았으면 업로드하고 기존 이미지를 삭제한 다음 카드 정보의 url 부분을 변경한다.
    */

    if (savedInfo.title !== card.title) {
      fs.renameSync(
        `uploads/card_info/${filename}`,
        `uploads/card_info/${filename.split('-')[0]}-${card.title}.json`
      );
    }
  }
  res.status(200).end();
};

const deleteCard = (req, res) => {
  // 1. req.params.id를 가져온다.
  // 2. 디렉토리 목록에서 해당 id를 가진 파일의 이름을 가져온다.
  // 3. json 파일을 읽어서 이미지 url 부분을 가져온다.
  // 4. 이미지를 삭제하고 json 파일도 삭제한다.
  const id = parseInt(req.params.id);
  const fileList = fs.readdirSync('uploads/card_info/');

  const cardFile = fileList.filter(
    (file) => parseInt(file.split('-')[0]) === id
  )[0];

  const card_info = JSON.parse(
    fs.readFileSync('uploads/card_info/' + cardFile)
  );

  const imageUrl = [card_info.front.image.url, card_info.back.image.url];
  console.log(imageUrl);

  try {
    imageUrl.forEach((file) => {
      if (file !== undefined) {
        fs.unlinkSync(file);
        console.log('이미지 삭제 성공');
      }
    });
    fs.unlinkSync('uploads/card_info/' + cardFile);
    console.log('파일 삭제 성공');
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.send(err).status(500).end();
  }
};

module.exports = {
  getAllCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
