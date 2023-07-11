import { css } from '@emotion/react';
import { color } from '@/constants';

export const button = css`
  box-shadow: rgba(15, 15, 15, 0.016) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px;
  background-color: rgb(251, 251, 250);

  padding: 1em;

  border: none;
  border-radius: 10px;
  border: 1px solid rgb(233, 233, 231);

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
