import type { Plane, ElementWithDepth } from '@/types/plane';

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

    if (!($dom instanceof Element)) {
      return;
    }

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
