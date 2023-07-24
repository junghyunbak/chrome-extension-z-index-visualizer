/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { QuarterViewPlane } from '@/components/QuarterViewPlane';
import { DragElementsContext } from '@/contexts/DragElements';
import { Address } from '@/components/Address';
import { Tile } from '@/components/Tile';
import { Controller } from '@/components/Controller';

function Panel() {
  const $dragElements = useRef<MutableRefObject<HTMLDivElement | null>[]>([]);

  return (
    <DragElementsContext.Provider value={$dragElements}>
      <Address />

      <Tile />

      <Controller type={'rightBottom'}>
        <Controller.Initializer $dragElements={$dragElements} />
      </Controller>

      <Controller type={'leftBottom'}>
        <Controller.ZoomInOut />
      </Controller>

      <QuarterViewPlane />
    </DragElementsContext.Provider>
  );
}

export default Panel;
