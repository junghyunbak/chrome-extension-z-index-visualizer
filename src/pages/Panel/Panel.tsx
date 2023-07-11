/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { Global } from '@emotion/react';

import { wheelZoomInOut, mouseDrag } from '@/utils/attachEventListener';
import { setTopLeftPosition, setDefaultScale } from '@/utils/dom';

import { ThreeDimPlane } from '@/components/ThreeDimPlane';
import { Button } from '@/components/Button';
import { Address } from '@/components/Address';

import * as S from './Panel.styles';

import ReactLogo from '@/assets/svg/logo.svg';
import Fit from '@/assets/svg/fit.svg';
import Refresh from '@/assets/svg/refresh.svg';

function Panel() {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);
  const background = useRef<HTMLDivElement | null>(null);

  const handleFitButtonClick = () => {
    setTopLeftPosition(drag.current);
    setDefaultScale(drag.current);
  };

  useEffect(() => {
    wheelZoomInOut(layout.current, drag.current);
    mouseDrag(layout.current, drag.current);
  }, []);

  return (
    <div css={S.layout} ref={layout}>
      <Global styles={S.global} />

      <Address />

      <div css={S.floor} ref={background} />

      <div css={S.tile}>
        <ReactLogo />
        <h1>Window</h1>
      </div>

      <div css={S.controller}>
        <Button onClick={handleFitButtonClick}>
          <Fit />
        </Button>
        <Button>
          <Refresh />
        </Button>
      </div>

      <div css={S.dragWrapper} ref={drag}>
        <ThreeDimPlane background={background} />
      </div>
    </div>
  );
}

export default Panel;
