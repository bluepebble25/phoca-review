const express = require('express');
const router = express.Router();
const ctrl = require('../controller/cards.ctrl');
const fs = require('fs');

const multer = require('multer');

function mkdir(path) {
  const exists = fs.existsSync(path);
  if (!exists) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function setDir(req, res, next) {
  mkdir('uploads/images');
  mkdir('uploads/card_info');

  const exists = fs.existsSync('uploads/index.txt');
  if (!exists) {
    fs.writeFileSync('uploads/index.txt', '0');
  }
  next();
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).array('file');

router.get('/', ctrl.getAllCards);
router.get('/:id', ctrl.getCard);
router.post('/', setDir, upload, ctrl.createCard);
router.post('/:id', setDir, upload, ctrl.updateCard);
router.delete('/:id', ctrl.deleteCard);

module.exports = router;
