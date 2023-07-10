import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const global = css`
  html,
  body {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`;

export const layout = css`
  position: fixed;
  inset: 0;
`;

interface DragWrapperProps {
  maxWidth: number;
  maxHeight: number;
}

export const DragWrapper = styled.div<DragWrapperProps>`
  position: absolute;

  height: 100%;
  aspect-ratio: 1 / ${(props) => props.maxWidth / props.maxHeight};

  transition: transform ease 0.3s;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const errorModal = css`
  position: fixed;
  inset: 0;

  background-color: black;

  z-index: 9999;
`;
