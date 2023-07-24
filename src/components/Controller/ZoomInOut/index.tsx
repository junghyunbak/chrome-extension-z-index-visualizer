import React, { useEffect } from 'react';
import { Button } from '@/components/Button';
import { useDispatch } from 'react-redux';
import { decreasePlaneRatio, increasePlaneRatio } from '@/store/slices/size';

import Minus from '@/assets/svg/minus.svg';
import Plus from '@/assets/svg/plus.svg';

export function ZoomInOut() {
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
    <>
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
    </>
  );
}
