import { css } from '@emotion/react';

interface Props {
  title: string;
  content?: string;
  author?: string;
  front?: object;
  image?: string;
}

/*
데이터 양식
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
  }
  */

function CardUI({ title, content, author, image }: Props) {
  return (
    <div css={cardUIStyle}>
      <img
        src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2F2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="이미지"
        css={imgStyle}
      />
      <div css={contentStyle}>
        <h2 css={titleStyle}>{title}</h2>
        <p css={authorStyle}>감독/작가</p>
      </div>
    </div>
  );
}

const cardUIStyle = css`
  position: relative;
  width: 147px;
  height: 227px;
  border-radius: 10px;
  background-color: #d9d9d9;
  overflow: hidden;
`;

const imgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const contentStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const titleStyle = css`
  font-size: 18px;
  max-width: 100px;
`;

const authorStyle = css``;

export default CardUI;
