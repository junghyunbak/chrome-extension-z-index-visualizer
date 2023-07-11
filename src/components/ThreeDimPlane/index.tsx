import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import * as S from './index.styles';

const activeClassName = 'active';

interface Props {
  background: React.MutableRefObject<HTMLDivElement | null>;
}

export function ThreeDimPlane({ background }: Props) {
  const layout = useRef<HTMLDivElement | null>(null);

  const clickedList = useAppSelector((state) => state.content.clickedList);
  const planes = useAppSelector((state) => state.content.planes);

  useEffect(() => {
    clickedList.forEach((index, i, arr) => {
      if (index >= 0) {
        const $line = document.querySelector(`[data-line="${index}"]`);

        if (!($line instanceof HTMLDivElement)) {
          return;
        }

        if (Array.from($line.classList).indexOf(activeClassName) !== -1) {
          $line.classList.remove(activeClassName);
        }

        setTimeout(() => {
          $line.classList.add(activeClassName);

          setTimeout(() => {
            $line.classList.remove(activeClassName);
          }, 2000);
        }, 50 * (arr.length - i + 1));
      }

      if (index === -1) {
        setTimeout(() => {
          if (background.current) {
            background.current.style.filter = 'brightness(0.8)';
          }

          setTimeout(() => {
            if (background.current) {
              background.current.style.filter = '';
            }
          }, 2000);
        }, 50 * (clickedList.length - 0 + 1));
      }
    });
  }, [clickedList, background]);

  const maxWidth = Math.max(...planes.map(({ size: { width } }) => width));
  const maxHeight = Math.max(...planes.map(({ size: { height } }) => height));

  return (
    <S.Layout
      activeClassName={activeClassName}
      ref={layout}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      {planes.map(
        ({ pos: { y, x }, size: { height, width }, depth, bgColor }, i) => {
          return (
            <S.Line
              data-line={i}
              key={i}
              y={y}
              x={x}
              width={width}
              height={height}
              depth={depth}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              style={{
                backgroundColor:
                  bgColor === 'rgba(0, 0, 0, 0)' ? 'white' : bgColor,
              }}
            />
          );
        }
      )}
    </S.Layout>
  );
}
