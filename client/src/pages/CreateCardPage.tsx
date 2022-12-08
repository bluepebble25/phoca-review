import { css } from '@emotion/react';
import React, { useState } from 'react';
import Input from '../components/atoms/Input/Input';
import TextArea from '../components/atoms/Input/TextArea';
// import Input from '../components/atoms/Input/Input';
// import TextArea from '../components/atoms/Input/TextArea';
import Logo from '../components/atoms/Logo';

function CreateCardPage() {
  const [cardInfo, setCardInfo] = useState({
    title: '',
    author: '',
  });
  const [cardContents, setCardContents] = useState({ front: '', back: '' });
  const [isCardFront, setIsCardFront] = useState(true);

  const onChangeCardInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const onChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardContents({ ...cardContents, [name]: value });
    console.log(cardContents);
  };

  return (
    <div css={backgroundStyle}>
      <div css={containerStyle}>
        <Logo margin="36px" />
        <div css={innerStyle}>
          <div css={cardContainerStyle}></div>
          <form css={formStyle}>
            {isCardFront ? (
              <>
                <Input
                  name="title"
                  labelName="제목"
                  onChange={onChangeCardInfo}
                />
                <Input
                  name="author"
                  labelName="작가/감독"
                  onChange={onChangeCardInfo}
                />
                <TextArea
                  name="contentsFront"
                  labelName="내용"
                  rows={10}
                  cols={40}
                  onChange={onChangeContents}
                />
              </>
            ) : (
              <TextArea
                name="contentsBack"
                labelName="내용"
                rows={10}
                cols={40}
                onChange={onChangeContents}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const backgroundStyle = css`
  height: 100vh;
  background-color: #a0ddff;
`;

const containerStyle = css`
  height: 100vh;
  width: 1000px;
  margin: 0 auto;
  background-color: white;
`;

const innerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 30px auto;
`;

const cardContainerStyle = css`
  width: 50%;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
`;

export default CreateCardPage;
