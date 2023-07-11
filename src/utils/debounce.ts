export const debounce = (callback: () => void, ms: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(callback, ms);
  };
};
