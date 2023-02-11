import React from 'react';
import { css } from '@emotion/react';
import { colorPalette, gradient } from '../../_lib/styles/colorPalette';
import ColorChip from '../atoms/ColorChip';
import { labelStyle } from '../atoms/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface CardOptionItemProps {
  inputColorRef?: React.Ref<HTMLInputElement>;
  fileRefs?: React.Ref<HTMLInputElement>[];
  optionName: string;
  fillingList: Array<string>;
  imageList?: Array<string> | undefined;
  type: 'color' | 'gradient' | 'font';
  isCardFront?: boolean;
  onClickColorChip: React.MouseEventHandler;
  onChangeColorPicker?: React.ChangeEventHandler;
  onFileChange?: React.ChangeEventHandler;
}

function CardOptionItem({
  inputColorRef,
  fileRefs,
  optionName,
  fillingList,
  imageList,
  type,
  isCardFront,
  onClickColorChip,
  onChangeColorPicker,
  onFileChange,
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

        {/* 단색 배경색 리스트 마지막에 붙는 color picker */}
        {type === 'color' && (
          <input
            type="color"
            ref={inputColorRef}
            css={colorPickerStyle}
            onChange={onChangeColorPicker}
          />
        )}

        {/* 그라디언트 배경 리스트 마지막에 붙는 이미지 파일 선택 input */}
        {type === 'gradient' && (
          <>
            <div css={fileInputBoxStyle(isCardFront!)}>
              <label htmlFor="image1" css={imageIconStyle}>
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                ref={fileRefs && fileRefs[0]}
                id="image1"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                css={fileInputStyle}
              />
            </div>
            <div css={fileInputBoxStyle(!isCardFront)}>
              <label htmlFor="image2" css={imageIconStyle}>
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                ref={fileRefs && fileRefs[1]}
                id="image2"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                css={fileInputStyle}
              />
            </div>
          </>
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

const fileInputBoxStyle = (isCardFront: boolean) => css`
  display: ${isCardFront ? 'block' : 'none'};
`;

const fileInputStyle = css`
  display: none;
`;

const imageIconStyle = css`
  display: flex;
  align-item: center;
  padding-left: 3px;
  cursor: pointer;
  font-size: 35px;
  color: #606470;
`;

export default CardOptionItem;
