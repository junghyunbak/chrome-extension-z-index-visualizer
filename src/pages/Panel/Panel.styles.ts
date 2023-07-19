import { zIndex } from '@/assets/style';
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

  .drag {
    cursor: grab;
    border: 2px solid royalblue;
  }

  .drag:active {
    cursor: grabbing;
  }
`;

export const layout = css`
  position: fixed;
  inset: 0;
`;

export const dragWrapper = css`
  position: relative;
  width: 100%;
  height: 100%;
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
    user-select: none;
  }
`;
