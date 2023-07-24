/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect, useContext } from 'react';
import { css } from '@emotion/react';
import { DragContext } from '@/contexts/Drag';
import { DragElementsContext } from '@/contexts/DragElements';
import { StackingContext } from './StackingContext';
import { useGlobalDrag } from '@/hooks/useGlobalDrag';
import { useAppSelector } from '@/hooks/useAppDispatch';

export function QuarterViewPlane() {
  const $layout = useRef<HTMLDivElement | null>(null);
  const $drag = useRef<HTMLDivElement | null>(null);
  const $target = useRef<HTMLElement | null>(null);

  const isSpacePress = useRef<boolean>(false);
  const isMousePress = useRef<boolean>(false);

  const prevPosX = useRef<number>(0);
  const prevPosY = useRef<number>(0);

  const planeTree = useAppSelector((state) => state.content.planeTree);

  const $dragElements = useContext(DragElementsContext);

  $dragElements?.current.push($drag);

  /**
   * 전체 요소 드래그
   */
  useGlobalDrag($drag);

  /**
   * 스페이스바의 눌림을 감지하는 코드.
   * 스페이스바를 누른 상태로는 전체 요소가 드래그 되고, 개별 요소는 제자리에 있어야 하므로 이를 식별하기 위함.
   */
  useEffect(() => {
    const handleWindowKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePress.current = true;
      }

      if (e.code === 'Escape') {
        $target.current = null;
      }
    };

    const handleWindowKeyup = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePress.current = false;
      }
    };

    window.addEventListener('keydown', handleWindowKeydown);
    window.addEventListener('keyup', handleWindowKeyup);

    return () => {
      window.removeEventListener('keydown', handleWindowKeydown);
      window.removeEventListener('keyup', handleWindowKeyup);
    };
  }, []);

  /**
   * QuarterView 영역 위에서 마우스가 움직일 때 발생하는 이벤트
   * 움직일 요소($target)가 설정되어 있는 상태라면 위치를 갱신함.
   */
  const handleLayoutMouseMove: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (!$target.current || !isMousePress || isSpacePress.current) {
      return;
    }

    const posX = prevPosX.current - e.clientX;
    const posY = prevPosY.current - e.clientY;

    prevPosX.current = e.clientX;
    prevPosY.current = e.clientY;

    $target.current.style.left = `${$target.current.offsetLeft - posX}px`;
    $target.current.style.top = `${$target.current.offsetTop - posY}px`;
  };

  return (
    <div
      ref={$layout}
      css={css`
        position: fixed;
        inset: 0;
      `}
      onMouseMove={handleLayoutMouseMove}
    >
      <div
        css={css`
          position: relative;
        `}
        ref={$drag}
      >
        <DragContext.Provider
          value={{
            isMousePress,
            prevPosX,
            prevPosY,
            $target,
          }}
        >
          <StackingContext planeTree={planeTree} />
        </DragContext.Provider>
      </div>
    </div>
  );
}
