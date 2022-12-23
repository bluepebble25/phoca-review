import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import Input from '../components/atoms/Input/Input';
import TextArea from '../components/atoms/Input/TextArea';
import Logo from '../components/atoms/Logo';
import CardPreview from '../components/molecules/CardPreview';
import CardOptionList from '../components/organisms/CardOptionList';
import { colorPalette } from '../_lib/styles/colorPalette';
import { getTextByte } from '../_lib/utils';

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

  const inputColorRef = useRef<HTMLInputElement>(null);

  const onChangeCardInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const textByte = getTextByte(value);
    if (name === 'title') {
      textByte < 60 && setCardInfo({ ...cardInfo, [name]: value });
      console.log(getTextByte(value));
    } else if (name === 'author') {
      textByte < 36 && setCardInfo({ ...cardInfo, [name]: value });
    }
  };

  const onChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(value.replaceAll('\n', '<br>'));
    getTextByte(value) < 360 &&
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

  const onChangeColorPicker = (
    isCardFront: boolean,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    isCardFront
      ? setCardCustomFront({
          ...cardCustomFront,
          type: 'color',
          value: e.target.value,
        })
      : setCardCustomBack({
          ...cardCustomBack,
          type: 'color',
          value: e.target.value,
        });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    const filesArray = Array.from(files);
    const selectedFiles: string[] = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    isCardFront
      ? setCardCustomFront({
          ...cardCustomFront,
          type: 'image',
          value: selectedFiles[0],
        })
      : setCardCustomBack({
          ...cardCustomFront,
          type: 'image',
          value: selectedFiles[0],
        });
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
                  onChangeContents={onChangeContents}
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
                  onChangeContents={onChangeContents}
                />
              </div>
            )}

            <CardOptionList
              inputColorRef={inputColorRef}
              onClickColorChip={onClickColorChip}
              onChangeColorPicker={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeColorPicker(isCardFront, e)
              }
              onFileChange={onFileChange}
              isCardFront={isCardFront}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const backgroundStyle = css`
  background-color: #a0ddff;
  height: 100%;
`;

const containerStyle = css`
  height: 100%;
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
