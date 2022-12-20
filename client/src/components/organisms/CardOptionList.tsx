import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import CardOptionItem from '../molecules/CardOptionItem';
import rainbowImage from '../../assets/images/rainbow_color.webp';
import textIconBlack from '../../assets/images/text_icon_black.png';
import textIconWhite from '../../assets/images/text_icon_white.png';
import { css } from '@emotion/react';
import React from 'react';

interface CardOptionsProps {
  inputColorRef: React.Ref<HTMLInputElement>;
  onClickColorChip: React.MouseEventHandler;
  onChangeColorPicker: React.ChangeEventHandler;
  onFileChange: React.ChangeEventHandler;
  isCardFront: boolean;
}

function CardOptions({
  inputColorRef,
  onClickColorChip,
  onChangeColorPicker,
  onFileChange,
  isCardFront,
}: CardOptionsProps) {
  const colorList = [
    colorPalette.white,
    colorPalette.black,
    colorPalette.yellow,
    colorPalette.green,
    colorPalette.blue,
    colorPalette.red,
    rainbowImage,
  ];

  const gradientList = [
    gradient.aurora,
    gradient.unripeMango,
    gradient.sunrise,
    gradient.greenSea,
    gradient.lilac,
  ];

  const fontColor = [colorPalette.white, colorPalette.black];
  const fontImageList = [textIconBlack, textIconWhite];

  return (
    <div css={ItemContainer}>
      <CardOptionItem
        inputColorRef={inputColorRef}
        optionName="단색 배경"
        type={'color'}
        fillingList={colorList}
        onClickColorChip={onClickColorChip}
        onChangeColorPicker={onChangeColorPicker}
        isCardFront={isCardFront}
      />
      <CardOptionItem
        type={'gradient'}
        optionName="그라데이션/이미지 배경"
        fillingList={gradientList}
        onClickColorChip={onClickColorChip}
        onFileChange={onFileChange}
        isCardFront={isCardFront}
      />
      <CardOptionItem
        type={'font'}
        optionName="텍스트 색상"
        fillingList={fontColor}
        imageList={fontImageList}
        onClickColorChip={onClickColorChip}
      />
    </div>
  );
}

const ItemContainer = css`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export default CardOptions;
