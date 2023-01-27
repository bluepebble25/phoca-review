import React from 'react';
import { css } from '@emotion/react';
import { colorPalette } from '../../_lib/styles/colorPalette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ConfirmModalProps {
  alertText: string;
  cancleText: string;
  okText: string;
  cancleHandler: React.MouseEventHandler<HTMLButtonElement>;
  okHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function ConfirmModal({
  alertText,
  cancleText,
  okText,
  cancleHandler,
  okHandler,
}: ConfirmModalProps) {
  return (
    <div css={modalWrapper}>
      <div css={modalStyle}>
        <div css={confirmTextBoxStyle}>
          <span css={comfirmTextStyle}>{alertText}</span>
        </div>
        <hr css={hrStyle} />
        <div css={buttonAreaStyle}>
          <button type="button" onClick={cancleHandler} css={buttonCommonStyle}>
            <span css={cancleTextStyle}>{cancleText}</span>
          </button>
          <button type="button" onClick={okHandler} css={buttonCommonStyle}>
            <span css={okTextStyle}>{okText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const modalWrapper = css`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
  // background-color: gray;
`;

const modalStyle = css`
  position: absolute;
  z-index: 1;
  width: 450px;
  border-radius: 10px;
  background-color: ${colorPalette.white};
  color: ${colorPalette.alertText};
  font-size: 18px;
`;

const closeBtnStyle = css`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px;
  border: none;
  background-color: transparent;
  color: ${colorPalette.lightgray};
  cursor: pointer;
`;

const confirmTextBoxStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 40px;
`;

const comfirmTextStyle = css`
  font-weight: 700;
`;

const hrStyle = css`
  height: 1px;
  border: none;
  background-color: ${colorPalette.lightestgray};
`;

const buttonAreaStyle = css`
  display: flex;
  justify-content: space-evenly;
  margin: 15px 0;
`;

const buttonCommonStyle = css`
  padding: 5px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const cancleTextStyle = css`
  color: ${colorPalette.alertText};
  font-size: 18px;
  font-weight: 700;
`;

const okTextStyle = css`
  color: ${colorPalette.red};
  font-size: 18px;
  font-weight: 700;
`;

export default ConfirmModal;
