/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { useAppSelector } from '@/hooks/useAppDispatch';

import { color } from '@/assets/style';

import { setElementStyleForAWhile } from '@/utils/dom';

import { css } from '@emotion/react';

const WINDOW_INDEX = -1;
const RATIO = 85;
const DEFAULT_DOM_BG = 'rgba(0, 0, 0, 0)';

interface Props {
  background: React.MutableRefObject<HTMLDivElement | null>;
}

export function QuarterViewPlane({ background }: Props) {
  const layout = useRef<HTMLDivElement | null>(null);

  const clickedList = useAppSelector((state) => state.content.clickedList);
  const planes = useAppSelector((state) => state.content.planes);

  useEffect(() => {
    clickedList.forEach((index, i, arr) => {
      if (index === WINDOW_INDEX) {
        if (!background.current) {
          return;
        }

        setElementStyleForAWhile(
          background.current,
          { filter: 'brightness(0.8)' },
          50 * (clickedList.length - 0 + 1),
          2000
        );
      } else {
        const $line = document.querySelector(`[data-line="${index}"]`);

        if (!($line instanceof HTMLDivElement)) {
          return;
        }

        setElementStyleForAWhile(
          $line,
          { filter: 'brightness(0.8)' },
          50 * (arr.length - i + 1),
          2000
        );
      }
    });
  }, [clickedList, background]);

  const maxWidth = Math.max(...planes.map(({ size: { width } }) => width));
  const maxHeight = Math.max(...planes.map(({ size: { height } }) => height));

  return (
    <div
      ref={layout}
      css={css`
        position: relative;
        height: 100%;
        aspect-ratio: 1 / ${maxWidth / maxHeight};
        display: flex;
        flex-direction: column-reverse;
        transform: skew(-30deg, 15deg);
      `}
    >
      {planes.map(
        ({ pos: { y, x }, size: { height, width }, depth, bgColor }, i) => {
          return (
            <div
              data-line={i}
              key={i}
              css={css`
                position: absolute;
                left: ${(y / maxHeight) * RATIO - (depth + 2)}%;
                bottom: ${(x / maxWidth) * RATIO + (depth + 3)}%;
                width: ${(height / maxHeight) * RATIO}%;
                height: ${(width / maxWidth) * RATIO}%;
                background-color: ${bgColor === DEFAULT_DOM_BG
                  ? 'white'
                  : bgColor};
                transition: background-color ease 0.2s;
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
