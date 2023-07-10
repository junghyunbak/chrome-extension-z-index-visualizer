import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../../hooks/useAppDispatch';
import * as S from './index.styles';

const activeClassName = 'active';

export function ThreeDimPlane() {
  const layout = useRef<HTMLDivElement | null>(null);
  const planes = useAppSelector((state) => state.content.planes);
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

  const maxWidth = Math.max(...planes.map(({ size: { width } }) => width));
  const maxHeight = Math.max(...planes.map(({ size: { height } }) => height));

  return (
    <S.Layout activeClassName={activeClassName} ref={layout}>
      {planes.map(({ pos: { y, x }, size: { height, width }, depth }, i) => {
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
          />
        );
      })}
    </S.Layout>
  );
}
