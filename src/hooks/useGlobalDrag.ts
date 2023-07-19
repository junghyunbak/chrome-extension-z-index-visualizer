import { useEffect } from 'react';

export const useGlobalDrag = ($target: HTMLElement | null) => {
  useEffect(() => {
    if (!$target) {
      return;
    }

    let isMousePress = false;
    let isSpacePress = false;
    let prevPosX = 0;
    let prevPosY = 0;

    const handleWindowKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePress = true;
      }
    };

    const handleWindowKeyup = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePress = false;
      }
    };

    const handleWindowMousedown = (e: MouseEvent) => {
      prevPosX = e.clientX;
      prevPosY = e.clientY;

      isMousePress = true;
    };

    const handleWindowMousemove = (e: MouseEvent) => {
      if (!isMousePress || !isSpacePress) {
        return;
      }

      const posX = prevPosX - e.clientX;
      const posY = prevPosY - e.clientY;

      prevPosX = e.clientX;
      prevPosY = e.clientY;

      $target.style.left = `${$target.offsetLeft - posX}px`;
      $target.style.top = `${$target.offsetTop - posY}px`;
    };

    const handleWindowMouseup = () => {
      isMousePress = false;
    };

    window.addEventListener('keydown', handleWindowKeydown);
    window.addEventListener('keyup', handleWindowKeyup);
    window.addEventListener('mousedown', handleWindowMousedown);
    window.addEventListener('mousemove', handleWindowMousemove);
    window.addEventListener('mouseup', handleWindowMouseup);

    return () => {
      window.removeEventListener('keydown', handleWindowKeydown);
      window.removeEventListener('keyup', handleWindowKeyup);
      window.removeEventListener('mousedown', handleWindowMousedown);
      window.removeEventListener('mousemove', handleWindowMousemove);
      window.removeEventListener('mouseup', handleWindowMouseup);
    };
  });
};
