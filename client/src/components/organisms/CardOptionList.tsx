import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import CardOptionItem from '../molecules/CardOptionItem';
import rainbowImage from '../../assets/images/rainbow_color.webp';
import { css } from '@emotion/react';

function CardOptions() {
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

  return (
    <div css={ItemContainer}>
      <CardOptionItem optionName="단색 배경" fillingList={colorList} />
      <CardOptionItem
        optionName="그라데이션/이미지 배경"
        fillingList={gradientList}
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
