import { css } from '@emotion/react';
import { color } from '../../../../constants';

export const layout = css`
  position: absolute;
  bottom: 0;
  right: 0;

  z-index: 3;
`;

export const button = css`
  box-shadow: rgba(15, 15, 15, 0.016) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px;

  background-color: white;

  padding: 1em;
  margin: 0 1em 1em 0;

  border: none;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    path {
      fill: ${color.borderColor};
    }
  }
`;
