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
