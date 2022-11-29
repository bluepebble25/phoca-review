import { css } from '@emotion/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  icon: IconDefinition;
  type: 'prev' | 'next';
}

function ArrowButton({ icon, type }: Props) {
  return (
    <button css={buttonStyle(type)}>
      <FontAwesomeIcon icon={icon} color="#4D5E80" fontSize="24px" />
    </button>
  );
}

export const buttonStyle = (type: 'prev' | 'next') => css`
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  margin: 24px;
  box-shadow: 0px 10px 30px rgba(39, 52, 79, 0.25);
  margin-left: ${type === 'next' && '35px'};
`;

export default ArrowButton;
