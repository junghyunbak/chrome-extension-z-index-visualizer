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
