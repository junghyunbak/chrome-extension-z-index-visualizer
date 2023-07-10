/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';

import { ThreeDimPlane } from './components/ThreeDimPlane';
import { FitButton } from './components/FitButton';

import { wheelZoomInOut, mouseDrag } from '../../utils/attachEventListener';

import { Global } from '@emotion/react';
import * as S from './Panel.styles';

function Panel() {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);

  const [isConnected, setIsConnected] = useState<boolean>(true);

  /**
   * 주기적으로 서비스 워커가 비활성화 되었는지 점검
   */
  useEffect(() => {
    const panelPort = chrome.runtime.connect();

    setInterval(() => {
      try {
        panelPort.postMessage('hello');
      } catch (e) {
        setIsConnected(false);
      }
    }, 1000);
  }, []);

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

  return (
    <div css={S.layout} ref={layout}>
      <Global styles={S.global} />
      <FitButton $target={drag.current} />

      <div css={S.dragWrapper} ref={drag}>
        <ThreeDimPlane />
      </div>

      {!isConnected && (
        <div css={S.errorModal}>
          <button
            onClick={() => {
              chrome.tabs.reload();
            }}
          >
            새로고침
          </button>
        </div>
      )}
    </div>
  );
}

export default Panel;
