/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';

import { ThreeDimPlane } from './components/ThreeDimPlane';

import { Global } from '@emotion/react';
import * as S from './Panel.styles';
import { FitButton } from './components/FitButton';

function Panel() {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);

  const setPlaneToStartLoc = () => {
    const $drag = drag.current;

    if ($drag instanceof HTMLDivElement) {
      $drag.style.top = '0px';
      $drag.style.left = '0px';
    }
  };

  /**
   * 3차원 좌표평면 드래그 이벤트
   */
  useEffect(() => {
    const $layout = layout.current;
    const $drag = drag.current;

    let isPress = false;
    let prevPosX = 0;
    let prevPosY = 0;

    if ($layout instanceof HTMLElement && $drag instanceof HTMLElement) {
      $drag.onmousedown = (e) => {
        prevPosX = e.clientX;
        prevPosY = e.clientY;

        isPress = true;
      };

      $layout.onmousemove = (e) => {
        if (!isPress) {
          return;
        }

        const posX = prevPosX - e.clientX;
        const posY = prevPosY - e.clientY;

        prevPosX = e.clientX;
        prevPosY = e.clientY;

        $drag.style.left = `${$drag.offsetLeft - posX}px`;
        $drag.style.top = `${$drag.offsetTop - posY}px`;
      };

      $drag.onmouseup = () => {
        isPress = false;
      };

      $layout.onmouseup = () => {
        isPress = false;
      };
    }
  }, []);

  return (
    <div css={S.layout} ref={layout}>
      <Global styles={S.global} />

      <FitButton setPlaneToStartLoc={setPlaneToStartLoc} />

      <div css={S.dragWrapper} ref={drag}>
        <ThreeDimPlane />
      </div>
    </div>
  );
}

export default Panel;
