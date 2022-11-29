import { coverStyle } from '../../styles/book';

export interface CoverProps {
  order: 'first' | 'last';
}

function Cover({ order }: CoverProps) {
  return <div css={coverStyle(order)}></div>;
}

export default Cover;
