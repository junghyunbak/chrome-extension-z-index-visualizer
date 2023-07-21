/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '@/hooks/useAppDispatch';

export function Tile() {
  const planeRatio = useAppSelector((state) => state.size.planeRatio);

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        transform: skew(-30deg, 15deg) scale(0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #61dafb;
        user-select: none;

        h1 {
          font-size: 6rem;
        }

        p {
          font-size: 2rem;
        }
      `}
    >
      <h1>Window</h1>
      <p>zoom: {Math.floor(planeRatio * 100)}%</p>
    </div>
  );
}
