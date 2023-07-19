/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import { color } from '@/assets/style';

import { Plane } from '@/types/plane';

/**
 * 상태로 변경할 예정
 */
const RATIO = 0.3;

const DEFAULT_DOM_BG = 'rgba(0, 0, 0, 0)';

interface Props extends HTMLAttributes<HTMLDivElement> {
  planes: Plane[];
}

export function QuarterViewPlane({ planes, ...props }: Props) {
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
      `}
      {...props}
    >
      {planes.map(
        ({ pos: { y, x }, size: { height, width }, depth, bgColor }, i) => {
          return (
            <div
              data-line={i}
              key={[y, x, height, width, depth, bgColor, i].join('|')}
              css={css`
                position: absolute;
                left: ${(window.innerWidth / 0.5 + y) * RATIO - depth * 3}px;
                bottom: ${(-(window.innerHeight / 0.5) + x) * RATIO +
                depth * 3}px;
                width: ${height * RATIO}px;
                height: ${width * RATIO}px;
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
