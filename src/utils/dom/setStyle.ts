export const setElementTopLeftPosition = ($target: HTMLElement | null) => {
  if (!$target) {
    return;
  }

  $target.style.top = '0px';
  $target.style.left = '0px';
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
    if (!$target.style[key]) {
      return;
    }

    $target.style[key] = '';
  });

  setTimeout(() => {
    Object.entries(styles).forEach(([key, value]) => {
      $target.style[key] = value;
    });

    setTimeout(() => {
      Object.entries(styles).forEach(([key, value]) => {
        $target.style[key] = '';
      });
    }, duration);
  }, delay);
};
