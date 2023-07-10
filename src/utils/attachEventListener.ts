const ZOOM_SPEED = 0.1;

export const wheelZoomInOut = (
  $parent: HTMLElement | null,
  $target: HTMLElement | null
): void => {
  if (!$parent || !$target) {
    return;
  }

  let zoom = 1;

  $parent.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
      zoom += ZOOM_SPEED;

      if (zoom > 1.5) {
        zoom = 1.5;
      }
    } else {
      zoom -= ZOOM_SPEED;

      if (zoom < 0.5) {
        zoom = 0.5;
      }
    }

    $target.style.transform = `scale(${zoom})`;
  });
};

export const mouseDrag = (
  $parent: HTMLElement | null,
  $target: HTMLElement | null
) => {
  if (!$parent || !$target) {
    return;
  }

  let isPress = false;
  let prevPosX = 0;
  let prevPosY = 0;

  if ($parent instanceof HTMLElement && $target instanceof HTMLElement) {
    $target.onmousedown = (e) => {
      prevPosX = e.clientX;
      prevPosY = e.clientY;

      isPress = true;
    };

    $parent.onmousemove = (e) => {
      if (!isPress) {
        return;
      }

      const posX = prevPosX - e.clientX;
      const posY = prevPosY - e.clientY;

      prevPosX = e.clientX;
      prevPosY = e.clientY;

      $target.style.left = `${$target.offsetLeft - posX}px`;
      $target.style.top = `${$target.offsetTop - posY}px`;
    };

    $target.onmouseup = () => {
      isPress = false;
    };

    $parent.onmouseup = () => {
      isPress = false;
    };
  }
};
