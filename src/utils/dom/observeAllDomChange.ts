import { debounce } from '@/utils/debounce';

export const observerAllDomChange = (callback: () => void) => {
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(() => {
    const domChange = debounce(callback, 1500);

    domChange();
  });

  const $html = document.querySelector('html');

  if ($html instanceof HTMLHtmlElement) {
    observer.observe($html, config);
  }
};
