import { css } from '@emotion/react';
import ColorChip from '../atoms/ColorChip';
import { labelStyle } from '../atoms/Label';

interface CardOptionProps {
  optionName: string;
  fillingList: Array<string>;
  imageList?: Array<string> | undefined;
}

function CardOptionItem({
  optionName,
  fillingList,
  imageList,
}: CardOptionProps) {
  return (
    <div css={optionItemStyle}>
      <div css={labelStyle}>
        <strong>{optionName}</strong>
      </div>
      <div css={chipsStyle}>
        {fillingList.map((filling, i) => {
          return (
            <ColorChip
              key={filling}
              filling={filling}
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
