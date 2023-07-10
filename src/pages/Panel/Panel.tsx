/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { useAppSelector } from '../../hooks/useAppDispatch';

import { ThreeDimPlane } from './components/ThreeDimPlane';
import { FitButton } from './components/FitButton';

import { wheelZoomInOut, mouseDrag } from '../../utils/attachEventListener';

import { Global } from '@emotion/react';
import * as S from './Panel.styles';

function Panel() {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);

  const planes = useAppSelector((state) => state.content.planes);

  useEffect(() => {
    /**
     * 마우스 휠에 따른 축소/확대
     */
    wheelZoomInOut(layout.current, drag.current);
    /**
     * 3차원 좌표평면 드래그 이벤트
     */
    mouseDrag(layout.current, drag.current);
  }, []);

  const maxWidth = Math.max(...planes.map(({ size: { width } }) => width));
  const maxHeight = Math.max(...planes.map(({ size: { height } }) => height));

  return (
    <div css={S.layout} ref={layout}>
      <Global styles={S.global} />
      <FitButton target={drag} />

      <S.DragWrapper ref={drag} maxWidth={maxWidth} maxHeight={maxHeight}>
        <ThreeDimPlane
          planes={planes}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      </S.DragWrapper>
    </div>
  );
}

export default Panel;
