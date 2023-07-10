import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../../hooks/useAppDispatch';
import { Plane } from '../../../../types/Plane';
import * as S from './index.styles';

const activeClassName = 'active';

interface Props {
  planes: Plane[];
  maxWidth: number;
  maxHeight: number;
}

export function ThreeDimPlane({ planes, maxWidth, maxHeight }: Props) {
  const layout = useRef<HTMLDivElement | null>(null);
  const clickedList = useAppSelector((state) => state.content.clickedList);

  useEffect(() => {
    clickedList.forEach((index) => {
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
      }, 10 * (planes.length - index));
    });
  }, [planes, clickedList]);

  return (
    <S.Layout activeClassName={activeClassName} ref={layout}>
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
