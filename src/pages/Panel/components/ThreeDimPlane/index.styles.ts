import styled from '@emotion/styled';
import { color } from '../../../../constants';

const defaultBgColor = color.bluePrintBg;
const activeBgColor = '#bcbcbc66';
const borderColor = '#ffffffab';

const ratio = 75;

interface LayoutProps {
  activeClassName: string;
}

export const Layout = styled.div<LayoutProps>`
  position: relative;
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: column-reverse;

  .${(props) => props.activeClassName} {
    background-color: ${activeBgColor};
  }
`;

interface PlaneProps {
  y: number;
  x: number;
  height: number;
  width: number;
  maxWidth: number;
  maxHeight: number;
  depth: number;
}

export const Line = styled.div<PlaneProps>`
  position: absolute;
  left: ${(props) => (props.y / props.maxHeight) * ratio}%;
  bottom: ${(props) => (props.x / props.maxWidth) * ratio + props.depth * 3}%;

  width: ${(props) => (props.height / props.maxHeight) * ratio}%;
  height: ${(props) => (props.width / props.maxWidth) * ratio}%;

  background-color: ${defaultBgColor};

  transition: background-color ease 0.2s;

  border: 0.5px solid ${borderColor};
  border-radius: 2px;
  backdrop-filter: blur(10px);

  transform: skewX(-30deg);
`;
