import { css } from '@emotion/react';
import React, { useState } from 'react';
import FlipButton from '../components/atoms/Buttons/FlipButton';
import Card from '../components/atoms/Card';
import CardFlipLabel from '../components/atoms/CardFlipLabel';
import Input from '../components/atoms/Input/Input';
import TextArea from '../components/atoms/Input/TextArea';
import Logo from '../components/atoms/Logo';
import CardOptionList from '../components/organisms/CardOptionList';

function CreateCardPage() {
  const [cardInfo, setCardInfo] = useState({
    title: '',
    author: '',
  });
  const [cardContents, setCardContents] = useState({
    contentsFront: '',
    contentsBack: '',
  });
  const [isCardFront, setIsCardFront] = useState(true);

  const onChangeCardInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const onChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardContents({ ...cardContents, [name]: value });
  };

  const onClickCardToggle = (e: React.MouseEvent) => {
    switch (e.currentTarget.id) {
      case 'frontLabel':
        setIsCardFront(true);
        break;
      case 'backLabel':
        setIsCardFront(false);
        break;
      default:
        setIsCardFront(!isCardFront);
    }
  };

  return (
    <div css={backgroundStyle}>
      <div css={containerStyle}>
        <Logo margin="36px" />
        <div css={innerStyle}>
          <div css={cardPreviewStyle}>
            <Card
              isCardFront={isCardFront}
              cardInfo={cardInfo}
              cardContents={cardContents}
            />
            <div css={flipTooAreaStyle}>
              <CardFlipLabel
                isCardFront={isCardFront}
                onClick={onClickCardToggle}
              />
              <div css={buttonWrapperStyle}>
                <FlipButton buttonSize={28} onClick={onClickCardToggle} />
              </div>
            </div>
          </div>
          <form css={formStyle}>
            {isCardFront ? (
              <div css={inputAreaStyle}>
                <Input
                  name="title"
                  labelName="제목"
                  onChange={onChangeCardInfo}
                  value={cardInfo.title}
                />
                <Input
                  name="author"
                  labelName="작가/감독"
                  value={cardInfo.author}
                  onChange={onChangeCardInfo}
                />
                <TextArea
                  name="contentsFront"
                  labelName="내용"
                  rows={10}
                  cols={40}
                  value={cardContents.contentsFront}
                  onChange={onChangeContents}
                />
              </div>
            ) : (
              <TextArea
                name="contentsBack"
                labelName="내용"
                rows={10}
                cols={40}
                value={cardContents.contentsBack}
                onChange={onChangeContents}
              />
            )}

            <CardOptionList />
          </form>
        </div>
      </div>
    </div>
  );
}

const backgroundStyle = css`
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

const cardPreviewStyle = css`
  width: 48%;
`;

const flipTooAreaStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const buttonWrapperStyle = css`
  position: absolute;
  top: -5px;
  right: 18px;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4%;
  width: 48%;
`;

const inputAreaStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 17px;
`;

export default CreateCardPage;
