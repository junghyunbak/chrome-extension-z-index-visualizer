import type { Plane, ElementWithDepth, HandlerOfDom } from '../types/Plane';

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

const getElementsWidthDepth = (
  $curEl: Element,
  depth: number,
  result: ElementWithDepth[]
) => {
  result.push({ $dom: $curEl, depth });

  Array.from($curEl.children).forEach(($nextEl) => {
    getElementsWidthDepth($nextEl, depth + 1, result);
  });
};

export const makePlaneObjects = (): Plane[] => {
  const planes: Plane[] = [];

  const $root = document.querySelector(':root');

  if (!$root) {
    return [];
  }

  const tmp: ElementWithDepth[] = [];

  getElementsWidthDepth($root, 0, tmp);

  tmp.forEach((v) => {
    const { $dom } = v;
    const { y, x, height, width } = $dom.getBoundingClientRect();
    const bgColor = window
      .getComputedStyle($dom, null)
      .getPropertyValue('background-color');
    const tagName = $dom.tagName.toLowerCase();

    if (tagName === 'span') {
      return;
    }

    if (height === 0) {
      return;
    }

    planes.push({ ...v, pos: { y, x }, size: { height, width }, bgColor });
  });

  planes.sort((a, b) => {
    if (a.depth < b.depth) {
      return -1;
    } else if (a.depth < b.depth) {
      return 1;
    } else {
      return b.size.height - a.size.height;
    }
  });

  return planes;
};

export const collectHandler = (eventName: string, handlers: HandlerOfDom[]) => {
  while (handlers.length) {
    const top = handlers.pop();

    if (!top) {
      return;
    }

    const { $dom, handler } = top;

    $dom.removeEventListener(eventName, handler);
  }
};

export const observerAllDomChange = (callback: () => void) => {
  let refreshTimer: ReturnType<typeof setTimeout> | null = null;

  const observer = new MutationObserver((mutations) => {
    if (mutations.length > 0) {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }

      refreshTimer = setTimeout(() => {
        callback();
      }, 1500);
    }
  });
  const $html = document.querySelector('html');

  if ($html instanceof HTMLHtmlElement) {
    observer.observe($html, { childList: true, subtree: true });
  }
};
