import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/atoms/Buttons/Button';
import Input from '../components/atoms/Input/Input';
import TextArea from '../components/atoms/Input/TextArea';
import Logo from '../components/atoms/Logo';
import CardPreview from '../components/molecules/CardPreview';
import CardOptionList from '../components/organisms/CardOptionList';
import CardApi from '../_lib/api/CardApi';
import useFetchCard from '../hooks/useFetchCard';
import Card from '../_lib/dto/Card';
import { colorPalette } from '../_lib/styles/colorPalette';

interface PageProps {
  isEditPage?: boolean;
}

function CreateCardPage({ isEditPage }: PageProps) {
  const [isCardFront, setIsCardFront] = useState(true);
  const [cardInfo, setCardInfo] = useState({
    title: '',
    author: '',
  });
  const [cardContents, setCardContents] = useState({
    front: '',
    back: '',
  });
  const [cardCustomFront, setCardCustomFront] = useState({
    type: 'color',
    value: colorPalette.white,
    fontColor: 'black',
    file: new File([], 'file1'),
  });
  const [cardCustomBack, setCardCustomBack] = useState({
    type: 'color',
    value: colorPalette.white,
    fontColor: 'black',
    file: new File([], 'file2'),
  });

  const maxLength = { title: 60, author: 24, contents: 340 };
  const inputColorRef = useRef<HTMLInputElement>(null); // 무지개빛 이미지를 클릭하면 원격으로 <input type="color"/>를 클릭하기 위한 속성
  const params = useParams();
  const id = isEditPage && params.id ? parseInt(params.id) : null;
  const card = useFetchCard(id);

  useEffect(() => {
    if (isEditPage && card) {
      setCardInfo({ ...card.cardInfo });
      setCardContents({ ...card.cardContents });
      setCardCustomFront({ ...cardCustomFront, ...card.cardCustomFront });
      setCardCustomBack({ ...cardCustomBack, ...card.cardCustomBack });
    }
  }, [card]);

  const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cardInfo.title || !cardInfo.author) {
      alert('제목과 작가/감독 란 입력은 필수입니다.');
      return;
    }
    const formData = new FormData();
    if (cardCustomFront.type === 'image') {
      if (cardCustomFront.file.size !== 0) {
        formData.append('file', cardCustomFront.file);
      }
    }
    if (cardCustomBack.type === 'image') {
      if (cardCustomBack.file.size !== 0) {
        formData.append('file', cardCustomBack.file);
      }
    }

    const card = new Card({
      ...cardInfo,
      cardContents,
      cardCustomFront,
      cardCustomBack,
    });
    const data = card.genSubmitData();

    formData.append('data', JSON.stringify(data));

    if (isEditPage) {
      CardApi.updateCard(id!, formData);
    } else {
      CardApi.createCard(formData);
    }
  };

  const onChangeCardInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const onChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardContents({ ...cardContents, [name]: value });
  };

  const onKeyUpCardInfo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const strLength = value.length;
    let slicedValue = value;
    if (name === 'title' && strLength > maxLength.title) {
      slicedValue = value.substring(0, maxLength.title);
    } else if (name === 'author' && strLength > maxLength.author) {
      slicedValue = value.substring(0, maxLength.author);
    }
    setCardInfo({ ...cardInfo, [name]: slicedValue });
  };

  const onKeyUpContents = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    if (value.length > maxLength.contents) {
      if (isCardFront) {
        setCardContents({
          ...cardContents,
          front: value.substring(0, maxLength.contents),
        });
      } else {
        setCardContents({
          ...cardContents,
          back: value.substring(0, maxLength.contents),
        });
      }
    }
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
          file: files[0],
        })
      : setCardCustomBack({
          ...cardCustomFront,
          type: 'image',
          value: selectedFiles[0],
          file: files[0],
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
                  value={cardInfo.title}
                  maxLength={maxLength.title}
                  onChangeCardInfo={onChangeCardInfo}
                  onKeyUpCardInfo={onKeyUpCardInfo}
                />
                <Input
                  name="author"
                  labelName="작가/감독"
                  value={cardInfo.author}
                  maxLength={maxLength.author}
                  onChangeCardInfo={onChangeCardInfo}
                  onKeyUpCardInfo={onKeyUpCardInfo}
                />
                <TextArea
                  name="front"
                  labelName="내용"
                  rows={10}
                  cols={40}
                  maxLength={maxLength.contents}
                  value={cardContents.front}
                  onChangeContents={onChangeContents}
                  onKeyUpContents={onKeyUpContents}
                />
              </div>
            ) : (
              <div css={inputAreaStyle}>
                <TextArea
                  name="back"
                  labelName="내용"
                  rows={10}
                  cols={40}
                  maxLength={maxLength.contents}
                  value={cardContents.back}
                  onChangeContents={onChangeContents}
                  onKeyUpContents={onKeyUpContents}
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

            <Button
              type="submit"
              priority="primary"
              margin="50px 0 0 0"
              onClickHandler={onClickSubmit}
            >
              완료
            </Button>
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
  padding-bottom: 80px;
  background-color: white;
`;

const innerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 40px auto 0 auto;
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
