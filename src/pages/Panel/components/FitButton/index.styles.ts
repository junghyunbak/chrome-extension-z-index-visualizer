import { css } from '@emotion/react';
import { color } from '../../../../constants';

export const layout = css`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 10%;
  height: 10%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  z-index: 3;

  svg {
    path {
      fill: ${color.borderColor};
    }
  }
`;
