import React, { useEffect, useRef } from 'react';
import type { Plane } from '../../../../types/Plane';
import { useAppSelector } from '../../../../hooks/useAppDispatch';
import * as S from './index.styles';

const activeClassName = 'active';

export function ThreeDimPlane() {
  const layout = useRef<HTMLDivElement | null>(null);
  const planes = useAppSelector((state) => state.content.planes);

  /*
  const handleClickEvent = (index: number, arr: Plane[]) => () => {
    const $line = document.querySelector(`[data-line="${index}"]`);

    if ($line instanceof HTMLDivElement) {
      if (Array.from($line.classList).indexOf(activeClassName) !== -1) {
        $line.classList.remove(activeClassName);
      }

      setTimeout(() => {
        $line.classList.add(activeClassName);

        setTimeout(() => {
          $line.classList.remove(activeClassName);
        }, 1000);
      }, 15 * (arr.length - index));
    }
  };
  */

  /**
   * 모든 dom 요소에 디버깅을 위한 click 이벤트 추가
   */
  /*
  useEffect(() => {
    const handlers: Array<{ dom: Element; handler: () => void }> = [];

    planes.forEach(({ dom }, i, arr) => {
      const handler = handleClickEvent(i, arr);

      handlers.push({ handler, dom });

      dom.addEventListener('click', handler);
    });

    return () => {
      handlers.forEach(({ handler, dom }) => {
        dom.removeEventListener('click', handler);
      });
    };
  }, [planes]);
  */

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
