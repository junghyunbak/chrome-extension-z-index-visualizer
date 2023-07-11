/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { useAppSelector } from '../../hooks/useAppDispatch';

import { ThreeDimPlane } from './components/ThreeDimPlane';
import { css } from '@emotion/react';

import { wheelZoomInOut, mouseDrag } from '../../utils/attachEventListener';
import { setTopLeftPosition, setDefaultScale } from '../../utils/dom';

import { Global } from '@emotion/react';
import * as S from './Panel.styles';
import { Button } from './components/Button';
import { Address } from './components/Address';

import ReactLogo from '../../assets/img/svg/logo.svg';
import Fit from '../../assets/img/svg/fit.svg';
import Refresh from '../../assets/img/svg/refresh.svg';

function Panel() {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);
  const background = useRef<HTMLDivElement | null>(null);

  const planes = useAppSelector((state) => state.content.planes);

  const handleFitButtonClick = () => {
    setTopLeftPosition(drag.current);
    setDefaultScale(drag.current);
  };

  useEffect(() => {
    wheelZoomInOut(layout.current, drag.current);
    mouseDrag(layout.current, drag.current);
  }, []);

  const maxWidth = Math.max(...planes.map(({ size: { width } }) => width));
  const maxHeight = Math.max(...planes.map(({ size: { height } }) => height));

  return (
    <div css={S.layout} ref={layout}>
      <Global styles={S.global} />
      <Address />

      <div
        css={css`
          position: fixed;
          inset: 0;
          background-color: white;
        `}
        ref={background}
      />

      <div
        css={css`
          position: fixed;
          inset: 0;
          transform: skew(-30deg, 15deg) scale(0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <ReactLogo />
        <h1
          css={css`
            color: #61dafb;
          `}
        >
          Window
        </h1>
      </div>

      <div
        css={css`
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 1rem 1rem 0;
        `}
      >
        <Button onClick={handleFitButtonClick}>
          <Fit />
        </Button>
        <Button>
          <Refresh />
        </Button>
      </div>

      <S.DragWrapper ref={drag} maxWidth={maxWidth} maxHeight={maxHeight}>
        <ThreeDimPlane
          planes={planes}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          background={background}
        />
      </S.DragWrapper>
    </div>
  );
}

export default Panel;
