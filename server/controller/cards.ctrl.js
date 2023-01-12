const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

const { CardSchema } = require('../models/Card');
const {
  readCards,
  deleteFile,
  getFilenameById,
  readCard,
  timeStamp,
  getTotalFileNum,
} = require('../_lib/helpers');

// controllers
const getAllCards = (req, res) => {
  let page = Number(req.query.page) || 1;
  const size = 32;

  if (!Number.isInteger(page)) {
    return res.status(400).send('page는 1 이상의 정수값이어야 합니다.');
  }
  page = page < 1 ? 1 : page;

  try {
    const cards = readCards('uploads/card_info/', page, size);
    const totalCardNum = getTotalFileNum('uploads/card_info');
    const data = {
      page: page,
      results: cards,
    };
    res.header('X-Total-Count', totalCardNum).json(data);
  } catch (e) {
    res
      .status(500)
      .send('서버에서 카드 값을 읽어오거나 전송하는데 문제가 생겼습니다.');
  }
};

const getCard = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send('id가 정수값인지 확인해주세요.');
  }

  const filename = getFilenameById(id);
  if (!filename) {
    return res.status(404).send('해당 id와 일치하는 카드가 존재하지 않습니다.');
  }

  try {
    const card = readCard(filename);
    res.json(card);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const createCard = (req, res) => {
  try {
    console.log(req.body.data);
    let card = JSON.parse(req.body.data);

    const isValid = ajv.validate(CardSchema, card);
    if (!isValid) {
      const err = new Error(
        '클라이언트로부터 받은 정보가 Card Schema 양식에 맞지 않음.'
      );
      err.name = 'WrongFormError';
      throw err;
    } else {
      // 현재 시각
      card.date = timeStamp();

      // 이미지 저장경로 처리
      const frontImg = card.front.image;
      const backImg = card.back.image;
      const images = [frontImg, backImg];
      /*
        1. 파일 0개 image.filename = ''
        2. 파일 1개 image.filename이 빈 문자열 아닌 곳에 image.filename = req.files[0].filename
        3. 파일 2개 image.filename에 차례대로 files[0], files[1]의 filename 대입
      */
      if (req.files && req.files.length === 2) {
        images.forEach((image, i) => {
          image.filename = `${req.files[i].filename}`;
        });
      } else if (req.files && req.files.length === 1) {
        images.forEach((image) => {
          if (image && image.filename) {
            image.filename = `${req.files[0].filename}`;
          }
        });
      }

      // 카드 id 프로퍼티 추가
      let index = parseInt(fs.readFileSync('uploads/index.txt')) + 1;
      const obj = {
        id: index,
      };
      card = Object.assign(obj, card);

      // 카드 저장 및 인덱스 업데이트
      fs.writeFileSync(
        `uploads/card_info/${index}-${card.title}.json`,
        JSON.stringify(card)
      );
      fs.writeFileSync('uploads/index.txt', `${index}`);
      res.status(201).json(card);
    }
  } catch (e) {
    console.error(e.stack);

    // 카드 생성 중 오류가 생겼으므로 서버로 업로드된 이미지를 삭제한다.
    req.files.forEach((file) => {
      if (file) {
        deleteFile(file.path);
      }
    });

    // 에러 코드 및 메시지 전송
    if (e.name === 'SyntaxError') {
      res
        .status(400)
        .send(
          '카드 정보는 JSON object 형태로 전송해야합니다. 오타가 없는지 확인해주세요.'
        );
    } else if (e.name === 'WrongFormError') {
      res
        .status(400)
        .send(
          '카드 정보를 양식(Schema)에 맞게 작성했는지, 빠뜨린 항목은 없는지 확인해주세요.'
        );
    } else {
      res.status(500).send(e.message);
    }
  }
};

const updateCard = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('id가 정수값인지 확인해주세요.');
      err.name = 'WrongIdError';
      throw err;
    }

    const filename = getFilenameById(id);
    if (!filename) {
      const err = new Error('존재하지 않는 id입니다.');
      err.name = 'IdNotFoundError';
      throw err;
    }
    const card = JSON.parse(req.body.data);
    const isValid = ajv.validate(CardSchema, card);

    if (!isValid) {
      const err = new Error(
        '클라이언트로부터 받은 정보가 Card Schema 양식에 맞지 않음.'
      );
      err.name = 'WrongFormError';
      throw err;
    } else {
      const savedInfo = readCard(filename);
      const prevImages = [savedInfo.front.image, savedInfo.back.image];
      const currentImages = [card.front.image, card.back.image];
      // 받은 이미지가 이미지 0개, 1개, 2개일 때 경우의 수 고려
      // 이미지 파일 안받았을 때
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        for (let i = 0; i < prevImages.length; i++) {
          // 원래 filename 있었는데 새로받은 filename이 빈칸인 경우 (삭제)
          if (
            prevImages[i].filename !== '' &&
            currentImages[i].filename === ''
          ) {
            deleteFile(prevImages[i].filename);
          }
        }
      } else {
        // 이미지 파일 1개 받았을 때
        // O는 문자열 존재, X는 빈문자열 / 왼쪽은 기존 filename, 오른쪽은 새로 받은 filename
        /*
          1. 이전 filename값과 현재값이 다른 경우
            1) O X delete
            2) O O(이전과 다름) delete 후 req.files[0]로 교체
            3) X O req.files[0]로 교체
          2. 이전 filename값과 현재값이 같은 경우 skip (if문 작성 X)
            4) O O
            5) X X
      */
        if (req.files.length === 1) {
          for (let i = 0; i < prevImages.length; i++) {
            if (prevImages[i].filename !== currentImages[i].filename) {
              // 이전에 이미지가 있었다면 지우고
              if (prevImages[i].filename !== '') {
                deleteFile('uploads/images/' + prevImages[i].filename);
              }
              // 업데이트된 이미지가 있다면 교체한다
              if (currentImages[i].filename !== '') {
                currentImages[i].filename = req.files[0].filename;
              }
            }
          }
        } else {
          // 이미지 파일 2개 받았을 때
          // 둘 다 삭제후 req.files[0], [1] 차례대로 current에 대입
          prevImages.forEach((img) => {
            deleteFile(img.filename);
          });
          for (let i = 0; i < prevImages.length; i++) {
            currentImages[i].filename = req.files[i].filename;
          }
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
    res.json(card);
  } catch (e) {
    console.error(e.stack);

    // 카드 생성 중 오류가 생겼으므로 서버로 업로드된 이미지를 삭제한다.
    req.files.forEach((file) => {
      if (file) {
        deleteFile(file.path);
      }
    });

    // 에러 코드 및 메시지 전송
    if (e.name === 'WrongIdError') {
      res.status(400).send('id가 정수값인지 확인해주세요.');
    } else if (e.name === 'IdNotFoundError') {
      res.status(404).send('해당 id와 일치하는 카드가 존재하지 않습니다.');
    } else if (e.name === 'SyntaxError') {
      res
        .status(400)
        .send(
          '카드 정보는 JSON object 형태로 전송해야합니다. 오타가 없는지 확인해주세요.'
        );
    } else if (e.name === 'WrongFormError') {
      res
        .status(400)
        .send(
          '카드 정보를 양식에 맞게 작성했는지, 빠뜨린 항목은 없는지 확인해주세요.'
        );
    } else {
      res.status(500).send(e.message);
    }
  }
};

const deleteCard = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send('id가 정수값인지 확인해주세요.');
  }

  const filename = getFilenameById(id);
  if (!filename) {
    return res.status(404).send('해당 id와 일치하는 카드가 존재하지 않습니다.');
  }

  const card = readCard(filename);
  const imageName = [card.front.image.filename, card.back.image.filename];

  try {
    imageName.forEach((name) => {
      if (name !== '') {
        deleteFile('uploads/images/' + name);
        console.log('이미지 삭제 성공');
      }
    });

    deleteFile('uploads/card_info/' + filename);
    console.log('파일 삭제 성공');
    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
