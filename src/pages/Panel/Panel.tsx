/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useRef } from 'react';

import { useGlobalDrag } from '@/hooks/useGlobalDrag';
import { useAppSelector } from '@/hooks/useAppDispatch';

import { css, Global } from '@emotion/react';

import { QuarterViewPlane } from '@/components/QuarterViewPlane';
import { Address } from '@/components/Address';
import { ControllerZoomInOut } from '@/components/Controller/ControllerZoomInOut';
import { ControllerInitializer } from '@/components/Controller/ControllerInitializer';

import * as S from './Panel.styles';

import ReactLogo from '@/assets/svg/logo.svg';

import { PlaneTree } from '@/types/plane';

function Panel() {
  const $layout = useRef<HTMLDivElement | null>(null);
  const $drag = useRef<HTMLDivElement | null>(null);
  const $target = useRef<HTMLElement | null>(null);
  const $dragElements = useRef<MutableRefObject<HTMLDivElement | null>[]>([
    $drag,
  ]);

  const isSpacePress = useRef<boolean>(false);
  const isMousePress = useRef<boolean>(false);
  const prevPosX = useRef<number>(0);
  const prevPosY = useRef<number>(0);

  const planeTree = useAppSelector((state) => state.content.planeTree);

  /**
   * 요소 전체 드래그
   */
  useGlobalDrag($drag);

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

  /**
   * 일부 요소 드래그
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

  const NestedDraggablePlaneElement = ({
    planeTree,
  }: {
    planeTree: PlaneTree;
  }) => {
    const wrapper = useRef<HTMLDivElement | null>(null);

    $dragElements.current.push(wrapper);

    const handleDragElementMouseDown: React.MouseEventHandler<
      HTMLDivElement
    > = (e) => {
      prevPosX.current = e.clientX;
      prevPosY.current = e.clientY;

      isMousePress.current = true;

      $target.current = wrapper.current;
    };

    const handleDragElementMouseUp: React.MouseEventHandler<
      HTMLDivElement
    > = () => {
      isMousePress.current = false;

      $target.current = null;
    };

    return (
      <div
        ref={wrapper}
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
                content: '${planeTree.zIndex === 0
                  ? 'auto'
                  : planeTree.zIndex}';
              }
            }
          }
        `}
      >
        <QuarterViewPlane
          planes={planeTree.data}
          onMouseDown={handleDragElementMouseDown}
          onMouseUp={handleDragElementMouseUp}
        />

        {planeTree.child.map((v) => {
          return <NestedDraggablePlaneElement planeTree={v} />;
        })}
      </div>
    );
  };

  return (
    <div ref={$layout} css={S.layout} onMouseMove={handleLayoutMouseMove}>
      <Global styles={S.global} />

      <Address />

      <div css={S.tile}>
        <ReactLogo />
        <h1>Window</h1>
      </div>

      <ControllerInitializer $dragElements={$dragElements} />
      <ControllerZoomInOut />

      <div ref={$drag} css={S.dragWrapper}>
        <NestedDraggablePlaneElement planeTree={planeTree} />
      </div>
    </div>
  );
}

export default Panel;
