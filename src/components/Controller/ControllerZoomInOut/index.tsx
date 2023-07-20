import React, { useEffect } from 'react';
import { ControllerWrapper } from '@/components/Controller/ControllerWrapper';
import { Button } from '@/components/Button';
import { useDispatch } from 'react-redux';
import { decreasePlaneRatio, increasePlaneRatio } from '@/store/slices/size';

import Minus from '@/assets/svg/minus.svg';
import Plus from '@/assets/svg/plus.svg';

export function ControllerZoomInOut() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        dispatch(increasePlaneRatio());
      } else {
        dispatch(decreasePlaneRatio());
      }
    };

    window.addEventListener('wheel', handleWindowWheel);

    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, []);

  return (
    <ControllerWrapper type={'leftBottom'}>
      <Button
        onClick={() => {
          dispatch(decreasePlaneRatio());
        }}
      >
        <Minus />
      </Button>
      <Button
        onClick={() => {
          dispatch(increasePlaneRatio());
        }}
      >
        <Plus />
      </Button>
    </ControllerWrapper>
  );
}
