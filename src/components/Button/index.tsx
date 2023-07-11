/** @jsxImportSource @emotion/react */
import React, { ButtonHTMLAttributes } from 'react';
import * as S from './index.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ ...props }: Props) {
  return <button css={S.button} {...props} />;
}
