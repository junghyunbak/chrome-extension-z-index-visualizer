/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { Global } from '@emotion/react';

import {
  addWheelZoomInOutListener,
  addMouseDragListener,
  setElementDefaultScale,
  setElementTopLeftPosition,
} from '@/utils/dom';

import { QuarterViewPlane } from '@/components/QuarterViewPlane';
import { Button } from '@/components/Button';
import { Address } from '@/components/Address';

import * as S from './Panel.styles';

import ReactLogo from '@/assets/svg/logo.svg';
import Fit from '@/assets/svg/fit.svg';
import Refresh from '@/assets/svg/refresh.svg';

interface Props {
  initProxyStore: () => void;
}

function Panel({ initProxyStore }: Props) {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);
  const background = useRef<HTMLDivElement | null>(null);

  const handleFitButtonClick = () => {
    setElementTopLeftPosition(drag.current);
    setElementDefaultScale(drag.current);
  };

  useEffect(() => {
    addWheelZoomInOutListener(layout.current, drag.current);
    addMouseDragListener(layout.current, drag.current);
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
        <Button onClick={initProxyStore}>
          <Refresh />
        </Button>
      </div>

      <div css={S.dragWrapper} ref={drag}>
        <QuarterViewPlane background={background} />
      </div>
    </div>
  );
}

export default Panel;
