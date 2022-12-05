import { css } from '@emotion/react';

interface Props {
  title: string;
  content?: string;
  author: string;
  front?: object;
  image?: string;
  background?: string;
}

function CardUI({ title, content, author, image, background }: Props) {
  return (
    <div css={cardUIStyle}>
      <img src="" alt="" css={imgStyle} />
      <div css={contentStyle}>
        <h2 css={titleStyle}>{title}</h2>
        <p css={authorStyle}>{author}</p>
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
