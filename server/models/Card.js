const CardSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
    },

    front: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
        },
        background: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
            },
            gradient: {
              type: 'string',
            },
          },
        },
        image: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            translate: {
              type: 'array',
              items: [
                {
                  type: 'integer',
                },
                {
                  type: 'integer',
                },
              ],
              minItems: 2,
              additionalItems: false,
            },
          },
          required: ['url', 'translate'],
        },
        text: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
            },
            size: {
              type: 'string',
            },
          },
          required: ['color', 'size'],
        },
      },
      required: ['content', 'text'],
    },

    back: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
        },
        background: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
            },
            gradient: {
              type: 'string',
            },
          },
        },
        image: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            translate: {
              type: 'array',
              items: [
                {
                  type: 'integer',
                },
                {
                  type: 'integer',
                },
              ],
              minItems: 2,
              additionalItems: false,
            },
          },
          required: ['url', 'translate'],
        },
        text: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
            },
            size: {
              type: 'string',
            },
          },
          required: ['color', 'size'],
        },
      },
      required: ['content', 'text'],
    },

    date: {
      type: 'string',
    },
  },
  required: ['title', 'author', 'front', 'back', 'date'],
};

module.exports = { CardSchema };

/***Card data Example***/
// A card only can have either background property or image property.
// At background property, either color or gradient too.
/*
{
  "title": "hello",
  "author": "word",
  "front": {
    "content": "This is content",
    "background": { "color": "black"},
    "image": { "url": "/uploads/images", "translate": [50, 0] },
    "text": { "color": "white", "size": "medium" }
  },
  "back": {
    "content": "Back",
    "background": { "gradient": "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)" },
    "image": { "url": "", "translate": [0, 0]},
    "text": { "color": "white", "size": "big"}
  },
  "date": ""
}
*/
