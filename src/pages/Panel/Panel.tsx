/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { ThreeDimPlane } from '../../components/ThreeDimPlane';

import { wheelZoomInOut, mouseDrag } from '../../utils/attachEventListener';
import { setTopLeftPosition, setDefaultScale } from '../../utils/dom';

import { Global } from '@emotion/react';
import * as S from './Panel.styles';
import { Button } from '../../components/Button';
import { Address } from '../../components/Address';

import ReactLogo from '@/assets/img/svg/logo.svg';
import Fit from '@/assets/img/svg/fit.svg';
import Refresh from '../../assets/img/svg/refresh.svg';

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
