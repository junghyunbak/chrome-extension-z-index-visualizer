/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useRef } from 'react';

import { useGlobalDrag } from '@/hooks/useGlobalDrag';
import { useAppSelector } from '@/hooks/useAppDispatch';

import { css, Global } from '@emotion/react';

import { setElementDefaultScale, setElementTopLeftPosition } from '@/utils/dom';

import { QuarterViewPlane } from '@/components/QuarterViewPlane';
import { Button } from '@/components/Button';
import { Address } from '@/components/Address';

import * as S from './Panel.styles';

import ReactLogo from '@/assets/svg/logo.svg';
import Fit from '@/assets/svg/fit.svg';

import { PlaneTree } from '@/types/plane';

function Panel() {
  const $layout = useRef<HTMLDivElement | null>(null);
  const $drag = useRef<HTMLDivElement | null>(null);
  const $target = useRef<HTMLElement | null>(null);

  const isSpacePress = useRef<boolean>(false);
  const isMousePress = useRef<boolean>(false);
  const prevPosX = useRef<number>(0);
  const prevPosY = useRef<number>(0);

  const planeTree = useAppSelector((state) => state.content.planeTree);

  useGlobalDrag($drag);

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

  const handleFitButtonClick = () => {
    setElementTopLeftPosition($drag.current);
    setElementDefaultScale($drag.current);
  };

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
    <div ref={$layout} css={S.layout} onMouseMove={handleLayoutMouseMove}>
      <Global styles={S.global} />

      <Address />

      <div css={S.tile}>
        <ReactLogo />
        <h1>Window</h1>
      </div>

      <div css={S.controller}>
        <Button onClick={handleFitButtonClick}>
          <Fit />
        </Button>
      </div>

      <div ref={$drag} css={S.dragWrapper}>
        <Test
          planeTree={planeTree}
          prevPosX={prevPosX}
          prevPosY={prevPosY}
          $target={$target}
          isMousePress={isMousePress}
        />
      </div>
    </div>
  );
}

/**
 * TODO: PlaneTree 타입 명 개선 후 컴포넌트 함수 명 변경
 */

interface Props {
  planeTree: PlaneTree;
  prevPosX: MutableRefObject<number>;
  prevPosY: MutableRefObject<number>;
  isMousePress: MutableRefObject<boolean>;
  $target: MutableRefObject<HTMLElement | null>;
}

const Test = ({ planeTree, ...refs }: Props) => {
  const { prevPosX, prevPosY, isMousePress, $target } = refs;

  const wrapper = useRef<HTMLDivElement | null>(null);

  const handleDragElementMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
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

        div:first-of-type > div:first-of-type {
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
      `}
    >
      <QuarterViewPlane
        planes={planeTree.data}
        onMouseDown={handleDragElementMouseDown}
        onMouseUp={handleDragElementMouseUp}
      />

      {planeTree.child.map((v) => {
        return <Test planeTree={v} {...refs} />;
      })}
    </div>
  );
};

export default Panel;
