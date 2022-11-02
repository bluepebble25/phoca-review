const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

const { CardSchema } = require('../models/Card');
const { deleteFile } = require('../_lib/helpers');

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
    const frontImg = cardInfo.front.image;
    const backImg = cardInfo.back.image;
    const images = [frontImg, backImg];
    /*
      1. 파일 0개 image.url = ''
      2. 파일 1개 빈 문자열 아닌 곳에 image.url = req.files[0].filename
      3. 파일 2개 image.url에 차례대로 files[0], files[1]의 filename 대입
    */
    if (req.files && req.files.length === 2) {
      images.forEach((image, i) => {
        image.url = `uploads/images/${req.files[i].filename}`;
      });
    } else if (req.files && req.files.length === 1) {
      images.forEach((image) => {
        if (image.url !== '') {
          image.url = `uploads/images/${req.files[0].filename}`;
        }
      });
    } else {
      images.forEach((image) => {
        image.url = '';
      });
    }
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

    const prevImages = [savedInfo.front.image, savedInfo.back.image];
    const currentImages = [card.front.image, card.back.image];
    // 받은 이미지가 이미지 0개, 1개, 2개일 때 경우의 수 고려

    // 이미지 파일 안받았을 때
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      for (let i = 0; i < prevImages.length; i++) {
        // 원래 url 있었는데 새로받은 url이 빈칸인 경우 (삭제)
        if (prevImages[i].url !== '' && currentImages[i].url === '') {
          deleteFile(prevImages[i].url);
        }
      }
    } else {
      // 이미지 파일 1개 받았을 때
      // O는 문자열 존재, X는 빈문자열 / 왼쪽은 기존 url, 오른쪽은 새로 받은 url
      /*
          1. 이전 url값과 현재값이 다른 경우
            1) O X delete 성공
            2) O O delete 후 req.files[0] 성공
            3) X O req.files[0] 테스트 필요(삭제가 잘 안되는듯)
          2. 이전 url값과 현재값이 같은 경우 skip (if문 작성 X)
            4) O O  성공
            5) X X  성공
      */
      if (req.files.length === 1) {
        for (let i = 0; i < prevImages.length; i++) {
          if (prevImages[i].url !== currentImages[i].url) {
            if (prevImages[i].url !== '') {
              deleteFile(prevImages[i].url);
            }
            if (currentImages[i].url !== '') {
              currentImages[i].url = `uploads/images/${req.files[0].filename}`;
            }
          }
        }
      } else {
        // 이미지 파일 2개 받았을 때
        // 둘 다 삭제후 req.files[0], [1] 차례대로 current에 대입
        prevImages.forEach((img) => {
          deleteFile(img.url);
        });
        currentImages[0].url = `uploads/images/${req.files[0].filename}`;
        currentImages[1].url = `uploads/images/${req.files[1].filename}`;
      }
    }

    fs.writeFileSync(`uploads/card_info/${filename}`, JSON.stringify(card));

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
