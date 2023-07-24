/** @jsxImportSource @emotion/react */
import React, { useRef, useContext } from 'react';
import { DragContext } from '@/contexts/Drag';
import { DragElementsContext } from '@/contexts/DragElements';
import { PlaneStack } from '../PlaneStack';
import type { PlaneTree } from '@/types/plane';
import { css } from '@emotion/react';

interface Props {
  planeTree: PlaneTree;
}

export function StackingContext({ planeTree }: Props) {
  const { isMousePress, prevPosX, prevPosY, $target } = useContext(DragContext);
  const $dragElements = useContext(DragElementsContext);
  const $drag = useRef<HTMLDivElement | null>(null);

  /**
   * 드래그 가능한 요소들 목록을 수집
   */
  $dragElements?.current.push($drag);

  const handleDragElementMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (!prevPosX || !prevPosY || !$target || !isMousePress) {
      return;
    }

    prevPosX.current = e.clientX;
    prevPosY.current = e.clientY;

    isMousePress.current = true;

    $target.current = $drag.current;
  };

  const handleDragElementMouseUp: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    if (!isMousePress || !$target) {
      return;
    }

    isMousePress.current = false;

    $target.current = null;
  };

  return (
    <div
      ref={$drag}
      css={css`
        position: relative;
        z-index: ${planeTree.zIndex};

        // hover 버블링을 이용하여 특정 요소가 hover 되었을 때
        // 모든 상위(부모)요소를 강조
        &:hover {
          > div:first-of-type > div:first-of-type {
            border: 2px solid crimson;

            &::after {
              display: block;
              position: absolute;
              bottom: -1rem;
              right: 0;
              content: '${planeTree.zIndex === 0 ? 'auto' : planeTree.zIndex}';
            }
          }
        }
      `}
    >
      <PlaneStack
        planes={planeTree.data}
        onMouseDown={handleDragElementMouseDown}
        onMouseUp={handleDragElementMouseUp}
      />

      {planeTree.child.map((v) => {
        return <StackingContext planeTree={v} />;
      })}
    </div>
  );
}
