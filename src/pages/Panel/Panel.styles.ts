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

  width: 100%;
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
