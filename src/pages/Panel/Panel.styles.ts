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
    &::before {
      content: '';
      display: block;
      position: fixed;
      inset: 0;
      border: 2px solid royalblue;
      z-index: ${zIndex.DraggableBorder};
    }
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
