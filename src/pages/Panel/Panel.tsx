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

interface Props {
  initProxyStore: () => void;
}

function Panel({ initProxyStore }: Props) {
  const layout = useRef<HTMLDivElement | null>(null);
  const drag = useRef<HTMLDivElement | null>(null);

  const planes = useAppSelector((state) => state.content.planes);

  const handleFitButtonClick = () => {
    setTopLeftPosition(drag.current);
    setDefaultScale(drag.current);
  };

  const handleRefreshStoreButtonClick = () => {
    initProxyStore();
  };

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
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
          >
            <path d="M1.75 10a.75.75 0 0 1 .75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 1 13.25v-2.5a.75.75 0 0 1 .75-.75Zm12.5 0a.75.75 0 0 1 .75.75v2.5A1.75 1.75 0 0 1 13.25 15h-2.5a.75.75 0 0 1 0-1.5h2.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 .75-.75ZM2.75 2.5a.25.25 0 0 0-.25.25v2.5a.75.75 0 0 1-1.5 0v-2.5C1 1.784 1.784 1 2.75 1h2.5a.75.75 0 0 1 0 1.5ZM10 1.75a.75.75 0 0 1 .75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.25.25 0 0 0-.25-.25h-2.5a.75.75 0 0 1-.75-.75Z"></path>
          </svg>
        </Button>
        <Button onClick={handleRefreshStoreButtonClick}>
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
          >
            <path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"></path>
          </svg>
        </Button>
      </div>

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
