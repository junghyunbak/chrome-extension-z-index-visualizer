/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '../../../../hooks/useAppDispatch';

export function Address() {
  const href = useAppSelector((state) => state.content.currentHref);

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
      `}
    >
      {href === '' ? 'No data. The web page needs to be refreshed.' : href}
    </div>
  );
}
