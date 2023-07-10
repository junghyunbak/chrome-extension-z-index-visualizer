export const setTopLeftPosition = ($target: HTMLElement | null) => {
  if (!$target) {
    return;
  }

  $target.style.top = '0px';
  $target.style.left = '0px';
};

export const setDefaultScale = ($target: HTMLElement | null) => {
  if (!$target) {
    return;
  }

  $target.style.transform = 'scale(1)';
};
