import { css } from '@emotion/react';

export const layout = css`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 10%;
  height: 10%;

  padding: 1%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  z-index: 3;

  svg {
    path {
      fill: #a2b8d1;
    }
  }
`;
