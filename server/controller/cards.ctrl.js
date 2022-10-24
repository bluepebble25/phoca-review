const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

const { CardSchema } = require('../models/Card');

// controllers
const getAllCards = (req, res) => {
  console.log(fs.existsSync('uploads'));
  res.send('hi');
};

const getCard = (req, res) => {};

const createCard = (req, res) => {
  const cardInfo = JSON.parse(req.body.jsonObject);
  const isValid = ajv.validate(CardSchema, cardInfo);

  console.log(JSON.parse(req.body.jsonObject));
  console.log(req.files);
  console.log(isValid);

  if (!isValid) {
    res.status(400).end();
  } else {
    fs.writeFile(
      `uploads/card_info/${cardInfo.title}.json`,
      req.body.jsonObject,
      function (err) {
        if (err === null) {
          res.send('upload success.');
        } else {
          res.send('upload fail');
        }
      }
    );
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
