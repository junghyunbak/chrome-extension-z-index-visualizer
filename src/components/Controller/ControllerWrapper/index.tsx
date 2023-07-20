/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';
import { zIndex } from '@/assets/style';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'leftBottom' | 'rightBottom' | 'leftTop' | 'rightTop';
}

export function ControllerWrapper({ type, children, ...props }: Props) {
  const inset = (() => {
    switch (type) {
      case 'leftBottom':
        return 'auto auto 0 0';
      case 'leftTop':
        return '0 auto auto 0';
      case 'rightBottom':
        return 'auto 0 0 auto';
      case 'rightTop':
        return '0 0 auto auto';
    }
  })();

  return (
    <div
      css={css`
        position: fixed;
        inset: ${inset};
        z-index: ${zIndex.controller};
        display: flex;
        align-items: center;
        margin: 1rem;
        gap: 0.5rem;
      `}
      {...props}
    >
      {children}
    </div>
  );
}
