const Ajv = require('ajv');
const ajv = new Ajv();
const { CardSchema } = require('../models/Card');

const getAllCards = (req, res) => {
  res.send('hi');
};

const getCard = (req, res) => {};

const createCard = (req, res) => {
  console.log(req.body);
  console.log(req.body.front.image.translate);
  const isValid = ajv.validate(CardSchema, req.body);
  console.log(isValid);
  res.status(200).end();
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
