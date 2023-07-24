/** @jsxImportSource @emotion/react */
import React from 'react';
import type { HTMLAttributes } from 'react';
import type { Plane } from '@/types/plane';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { css } from '@emotion/react';
import { color } from '@/assets/style';

const DEFAULT_DOM_BG = 'rgba(0, 0, 0, 0)';

interface Props extends HTMLAttributes<HTMLDivElement> {
  planes: Plane[];
}

export function PlaneStack({ planes, ...props }: Props) {
  /**
   * redux -> context로 변경 고려
   */
  const planeRatio = useAppSelector((state) => state.size.planeRatio);

  planes.sort((a, b) => a.depth - b.depth);

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
        transform: skew(-30deg, 15deg);

        &:hover > div:first-of-type {
          border: 2px solid royalblue !important;
        }

        cursor: grab;
        &:active {
          cursor: grabbing;
        }

        > div:first-of-type {
          &::before {
            content: '';
            opacity: 0.5;
            display: block;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              45deg,
              lightgray 25%,
              white 0,
              white 50%,
              lightgray 0,
              lightgray 75%,
              white 0
            );
            background-size: 20px 20px;
          }
        }
      `}
      {...props}
    >
      {planes.map(
        ({ pos: { y, x }, size: { height, width }, depth, bgColor }, i) => {
          return (
            <div
              key={[y, x, height, width, depth, bgColor, i].join('|')}
              css={css`
                position: absolute;
                left: ${(window.innerWidth / 0.5 + y) * planeRatio -
                depth * 3}px;
                bottom: ${(-(window.innerHeight / 0.5) + x) * planeRatio +
                depth * 3}px;
                width: ${height * planeRatio}px;
                height: ${width * planeRatio}px;
                background-color: ${bgColor === DEFAULT_DOM_BG
                  ? 'white'
                  : bgColor};
                transition: filter ease 0.2s;
                border: 1px solid ${color.borderColor};
                border-radius: 5px;
              `}
            />
          );
        }
      )}
    </div>
  );
}
