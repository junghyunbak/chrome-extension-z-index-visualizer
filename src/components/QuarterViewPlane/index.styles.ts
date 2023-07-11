import styled from '@emotion/styled';

interface LayoutProps {
  activeClassName: string;
  maxWidth: number;
  maxHeight: number;
}

export const Layout = styled.div<LayoutProps>`
  position: relative;

  height: 100%;
  aspect-ratio: 1 / ${(props) => props.maxWidth / props.maxHeight};

  box-sizing: border-box;

  display: flex;
  flex-direction: column-reverse;

  .${(props) => props.activeClassName} {
    filter: brightness(0.8);
  }

  transform: skew(-30deg, 15deg);
`;
