const ZOOM_SPEED = 0.1;
const ZOOM_MAX = 1.8;
const ZOOM_MIN = 0.2;

export const addWheelZoomInOutListener = (
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

      if (zoom > ZOOM_MAX) {
        zoom = ZOOM_MAX;
      }
    } else {
      zoom -= ZOOM_SPEED;

      if (zoom < ZOOM_MIN) {
        zoom = ZOOM_MIN;
      }
    }

    $target.style.transform = `scale(${zoom})`;
  });
};

export const addMouseDragListener = (
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
