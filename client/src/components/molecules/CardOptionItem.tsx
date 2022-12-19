import { css } from '@emotion/react';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import ColorChip from '../atoms/ColorChip';
import { labelStyle } from '../atoms/Label';

interface CardOptionItemProps {
  inputColorRef?: React.Ref<HTMLInputElement>;
  optionName: string;
  fillingList: Array<string>;
  imageList?: Array<string> | undefined;
  type: 'color' | 'gradient' | 'font';
  onClickColorChip: React.MouseEventHandler;
  onChangeColorPicker?: React.ChangeEventHandler;
}

function CardOptionItem({
  inputColorRef,
  optionName,
  fillingList,
  imageList,
  type,
  onClickColorChip,
  onChangeColorPicker,
}: CardOptionItemProps) {
  return (
    <div>
      <div css={labelStyle}>
        <strong>{optionName}</strong>
      </div>
      <div css={chipsStyle} id={type} onClick={onClickColorChip}>
        {fillingList.map((filling, i) => {
          let colorName;
          if (type === 'color') {
            colorName = Object.keys(colorPalette).find(
              (key) => colorPalette[key] === filling
            );
          } else if (type === 'gradient') {
            colorName = Object.keys(gradient).find(
              (key) => gradient[key] === filling
            );
          } else if (type === 'font') {
            colorName = filling === '#FFFFFF' ? 'black' : 'white';
          }

          return (
            <ColorChip
              key={filling}
              type={type}
              filling={filling}
              colorName={colorName}
              {...(filling === '#FFFFFF'
                ? { borderExists: true }
                : { borderExists: false })}
              {...(imageList ? { floatImage: imageList[i] } : {})}
            />
          );
        })}

        {type === 'color' && (
          <input
            type="color"
            ref={inputColorRef}
            css={colorPickerStyle}
            onChange={onChangeColorPicker}
          />
        )}
      </div>
    </div>
  );
}

const chipsStyle = css`
  position: relative;
  display: flex;
  gap: 12px;
`;

const colorPickerStyle = css`
  position: absolute;
  visibility: hidden;
  right: 27px;

  width: 34px;
  height: 34px;
`;

export default CardOptionItem;
