import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import Input from '../components/atoms/Input/Input';
import TextArea from '../components/atoms/Input/TextArea';
import Logo from '../components/atoms/Logo';
import CardPreview from '../components/molecules/CardPreview';
import CardOptionList from '../components/organisms/CardOptionList';
import { colorPalette } from '../_lib/styles/colorPalette';

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
  const [cardCustomFront, setCardCustomFront] = useState({
    type: 'color',
    value: colorPalette.white,
    fontColor: 'black',
  });
  const [cardCustomBack, setCardCustomBack] = useState({
    type: 'color',
    value: colorPalette.white,
    fontColor: 'black',
  });

  console.log(cardCustomFront, cardCustomBack);

  const inputColorRef = useRef<HTMLInputElement>(null);

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
    const target = e.target as HTMLButtonElement;
    if (target.tagName === 'BUTTON') {
      const type = e.currentTarget.id;
      if (type === 'font') {
        isCardFront
          ? setCardCustomFront({
              ...cardCustomFront,
              fontColor: target.value,
            })
          : setCardCustomBack({
              ...cardCustomBack,
              fontColor: target.value,
            });
      } else if (
        (type === 'color' && target.value !== 'colorPicker') ||
        type === 'gradient'
      ) {
        isCardFront
          ? setCardCustomFront({
              ...cardCustomFront,
              type: type,
              value: target.value,
            })
          : setCardCustomBack({
              ...cardCustomBack,
              type: type,
              value: target.value,
            });
      }
    }

    if ((e.target as HTMLElement).tagName === 'IMG') {
      // font 색 선택 버튼처럼 내부에 이미지가 있는 경우
      let parentTag = e.target as HTMLElement;
      while (parentTag.tagName !== 'BUTTON') {
        if (parentTag.parentElement) {
          parentTag = parentTag.parentElement;
        }
      }
      const type = e.currentTarget.id;
      if (type === 'font') {
        isCardFront
          ? setCardCustomFront({
              ...cardCustomFront,
              fontColor: (parentTag as HTMLButtonElement).value,
            })
          : setCardCustomBack({
              ...cardCustomBack,
              fontColor: (parentTag as HTMLButtonElement).value,
            });
      }
    }

    if ((e.target as HTMLButtonElement).value === 'colorPicker') {
      if (inputColorRef.current) {
        inputColorRef.current.click();
      }
    }
  };

  return (
    <div css={backgroundStyle}>
      <div css={containerStyle}>
        <Logo margin="36px" />
        <div css={innerStyle}>
          <CardPreview
            cardCustomFront={cardCustomFront}
            cardCustomBack={cardCustomBack}
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

            <CardOptionList
              inputColorRef={inputColorRef}
              onClickColorChip={onClickColorChip}
            />
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
