import { css } from '@emotion/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  icon: IconDefinition;
  type: 'prev' | 'next';
  isBookOpen: boolean;
  onClick?: React.MouseEventHandler;
}

function ArrowButton({ icon, type, isBookOpen, onClick }: Props) {
  return (
    <button css={buttonStyle(type, isBookOpen)} onClick={onClick}>
      <FontAwesomeIcon icon={icon} color="#4D5E80" fontSize="24px" />
    </button>
  );
}

export const buttonStyle = (type: 'prev' | 'next', isBookOpen: boolean) => css`
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  margin: 24px;
  box-shadow: 0px 10px 30px rgba(39, 52, 79, 0.25);
  margin-left: ${type === 'next' && '35px'};
  transform: translateX(
    ${isBookOpen ? (type === 'next' ? '180px' : '-210px') : '0px'}
  );
`;

export default ArrowButton;
