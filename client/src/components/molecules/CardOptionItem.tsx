import { css } from '@emotion/react';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import ColorChip from '../atoms/ColorChip';
import { labelStyle } from '../atoms/Label';

interface CardOptionProps {
  optionName: string;
  fillingList: Array<string>;
  imageList?: Array<string> | undefined;
  type: 'color' | 'gradient' | 'font';
  onClickColorChip: React.MouseEventHandler;
}

function CardOptionItem({
  optionName,
  fillingList,
  imageList,
  type,
  onClickColorChip,
}: CardOptionProps) {
  return (
    <div css={optionItemStyle}>
      <div css={labelStyle}>
        <strong>{optionName}</strong>
      </div>
      <div css={chipsStyle} id={type} onClick={onClickColorChip}>
        {fillingList.map((filling, i) => {
          let colorName;
          if (type === 'color' || type === 'font') {
            colorName = Object.keys(colorPalette).find(
              (key) => colorPalette[key] === filling
            );
          } else if (type === 'gradient') {
            colorName = Object.keys(gradient).find(
              (key) => gradient[key] === filling
            );
          }

          return (
            <ColorChip
              key={filling}
              filling={filling}
              colorName={colorName}
              {...(filling === '#FFFFFF'
                ? { borderExists: true }
                : { borderExists: false })}
              {...(imageList ? { floatImage: imageList[i] } : {})}
            />
          );
        })}
      </div>
    </div>
  );
}

const optionItemStyle = css``;

const chipsStyle = css`
  display: flex;
  gap: 12px;
`;

export default CardOptionItem;
