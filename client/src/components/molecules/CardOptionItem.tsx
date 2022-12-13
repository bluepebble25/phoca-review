import { css } from '@emotion/react';
import ColorChip from '../atoms/ColorChip';
import { labelStyle } from '../atoms/Label';

interface CardOptionProps {
  optionName: string;
  fillingList: Array<string>;
}

function CardOptionItem({ optionName, fillingList }: CardOptionProps) {
  return (
    <div css={optionItemStyle}>
      <div css={labelStyle}>
        <strong>{optionName}</strong>
      </div>
      <div css={chipsStyle}>
        {fillingList.map((filling) => {
          if (filling.split('(').length !== 0) {
          }
          return filling === '#FFFFFF' ? (
            <ColorChip key={filling} filling={filling} borderExists={true} />
          ) : (
            <ColorChip key={filling} filling={filling} borderExists={false} />
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
