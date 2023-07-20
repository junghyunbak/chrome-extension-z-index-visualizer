export const setElementTopLeftPosition = ($target: HTMLElement | null) => {
  if (!$target) {
    return;
  }

  $target.style.transition = 'inset ease 0.5s';

  $target.style.top = '0px';
  $target.style.left = '0px';

  setTimeout(() => {
    $target.style.transition = '';
  }, 500);
};

export const setElementDefaultScale = ($target: HTMLElement | null) => {
  if (!$target) {
    return;
  }

  $target.style.transform = 'scale(1)';
};

export const setElementStyleForAWhile = (
  $target: HTMLElement | null,
  styles: { [key: string]: string },
  delay: number,
  duration: number
) => {
  if (!$target) {
    return;
  }

  Object.entries(styles).forEach(([key]) => {
    if (!$target.style.getPropertyValue(key)) {
      return;
    }

    $target.style.setProperty(key, '');
  });

  setTimeout(() => {
    Object.entries(styles).forEach(([key, value]) => {
      $target.style.setProperty(key, value);
    });

    setTimeout(() => {
      Object.entries(styles).forEach(([key, value]) => {
        $target.style.setProperty(key, '');
      });
    }, duration);
  }, delay);
};
