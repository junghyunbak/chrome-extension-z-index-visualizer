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
  color: #ffffff;

  position: fixed;
  inset: 0;
`;

export const dragWrapper = css`
  position: absolute;

  width: 100%;
  height: 100%;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;
