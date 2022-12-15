import { css } from '@emotion/react';
import React, { useState } from 'react';
import Input from '../components/atoms/Input/Input';
import TextArea from '../components/atoms/Input/TextArea';
import Logo from '../components/atoms/Logo';
import CardPreview from '../components/molecules/CardPreview';
import CardOptionList from '../components/organisms/CardOptionList';

function CreateCardPage() {
  const [isCardFront, setIsCardFront] = useState(true);
  const [cardInfo, setCardInfo] = useState({
    title: '',
    author: '',
  });
  const [cardContents, setCardContents] = useState({
    contentsFront: '',
    contentsBack: '',
  });
  const [cardBg, setCardBg] = useState({ type: '', value: '' });

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

  const onClickColorChip = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).tagName === 'BUTTON') {
      const type = e.currentTarget.id;
      setCardBg({ type: type, value: (e.target as HTMLButtonElement).value });
    }
    if ((e.target as HTMLElement).tagName === 'IMG') {
      let parentTag = e.target as HTMLElement;
      while (parentTag.tagName !== 'BUTTON') {
        if (parentTag.parentElement) {
          parentTag = parentTag.parentElement;
        }
      }
      const type = e.currentTarget.id;
      setCardBg({ type: type, value: (parentTag as HTMLButtonElement).value });
    }
  };

  return (
    <div css={backgroundStyle}>
      <div css={containerStyle}>
        <Logo margin="36px" />
        <div css={innerStyle}>
          <CardPreview
            cardInfo={cardInfo}
            cardContents={cardContents}
            isCardFront={isCardFront}
            onClickCardToggle={onClickCardToggle}
          />
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
              <div css={inputAreaStyle}>
                <TextArea
                  name="contentsBack"
                  labelName="내용"
                  rows={10}
                  cols={40}
                  value={cardContents.contentsBack}
                  onChange={onChangeContents}
                />
              </div>
            )}

            <CardOptionList onClickColorChip={onClickColorChip} />
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
