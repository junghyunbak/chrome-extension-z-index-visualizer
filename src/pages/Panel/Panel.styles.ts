import { css } from '@emotion/react';

export const global = css`
  html,
  body {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`;

export const layout = css`
  position: fixed;
  inset: 0;
`;

export const dragWrapper = css`
  position: absolute;

  height: 100%;

  transition: transform ease 0.3s;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const errorModal = css`
  position: fixed;
  inset: 0;

  background-color: black;

  z-index: 9999;
`;

export const controller = css`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1rem 1rem 0;
`;

export const floor = css`
  position: fixed;
  inset: 0;
  background-color: white;
  transition: filter ease 0.2s;
`;

export const tile = css`
  position: fixed;
  inset: 0;
  transform: skew(-30deg, 15deg) scale(0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #61dafb;
  }
`;
