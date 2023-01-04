const BgOption = {
  type: 'object',
  properties: {
    color: {
      type: 'string',
    },
    gradient: {
      type: 'string',
    },
  },
};

const Image = {
  type: 'object',
  properties: {
    filename: {
      type: 'string',
    },
  },
  required: ['filename'],
};

const Font = {
  type: 'object',
  properties: {
    color: {
      type: 'string',
    },
  },
  required: ['color'],
};

const Cardface = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    background: BgOption,
    image: Image,
    font: Font,
  },
  required: ['content', 'font'],
};

const CardSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    front: Cardface,
    back: Cardface,
    date: {
      type: 'string',
    },
  },
  required: ['title', 'author', 'front', 'back'],
};

module.exports = { CardSchema };

/***Card data Example***/
/* Request */
/*
{
  "id": 1,
  "title": "hello",
  "author": "world",
  "front": {
    "content": "This is content",
    "image": { "filename": "cloud1234.jpg" },
    "font": { "color": "white" }
  },
  "back": {
    "content": "Also this is content",
    "background": { "gradient": "unripen mango" },
    "font": { "color": "white" }
  },
  "date": "2023-01-01 00:00:01"
}
*/

/* Response */
/*
{
  "id": 1,
  "title": "hello",
  "author": "world",
  "front": {
    "content": "This is content",
    "image": { "filename": "cloud1234.jpg" },
    "font": { "color": "white" }
  },
  "back": {
    "content": "Also this is content",
    "background": { "gradient": "unripen mango" },
    "font": { "color": "white" }
  },
  "date": "2023-01-01 00:00:01"
}
*/
