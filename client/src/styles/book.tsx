import { css } from '@emotion/react';

export const buttonStyle = css`
  width: 62px;
  height: 62px;
  border: none;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0px 10px 30px rgba(39, 52, 79, 0.25);
`;

export const sceneStyle = css`
  perspective: 1500px;
`;
export const bookStyle = css`
  position: relative;
  width: 366px;
  height: 526px;
  transform-style: preserve-3d;
`;
export const coverStyle = (order: 'first' | 'last') => css`
  z-index: ${order === 'first' ? '1000' : '-1'};
  position: absolute;
  display: flex;
  width: 104%;
  height: 106%;
  top: -3%;

  font-size: 30px;
  text-align: center;
  transform-origin: left;
  transition: transform 0.8s;

  background-color: #3e51b1;
  border-radius: 2px 10px 10px 2px;
  box-shadow: 1px 1px 10px gray;
`;
export const paperStyle = css`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  transform-origin: left;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

export const pageStyle = (face: 'front' | 'back') => css`
  display: flex;
  justify-content: center;
  align-items: start;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: ${face === 'back' && 'rotateY(180deg)'};
`;

export const contentStyle = css`
  padding-top: 24px;
  width: 318px;
  height: 227px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 24px;
`;
