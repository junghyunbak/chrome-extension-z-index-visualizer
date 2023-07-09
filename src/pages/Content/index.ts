import { createStoreProxy } from '../../store';
import type { Plane } from '../../types/Plane';
import PortNames from '../../types/PortNames';
import { updateClickedList, updatePlanes } from '../../store/slices/content';

const proxyStore = createStoreProxy(PortNames.ContentPort);

type Pick<T, K extends keyof T> = {
  [k in K]: T[k];
};

type ElementWithDepth = Pick<Plane, '$dom' | 'depth'>;

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

const getPlanes = () => {
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

    if (height === 0) {
      return;
    }

    planes.push({ ...v, pos: { y, x }, size: { height, width } });
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

let clickedList: number[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

const initial = async () => {
  await proxyStore.ready();

  const planes = getPlanes();

  await proxyStore.dispatch(updatePlanes(planes));

  console.log('result', proxyStore.getState());

  /**
   * 각 요소에 click 이벤트 추가
   */
  const handlers: Array<{ $dom: Element; handler: () => void }> = [];

  planes.forEach(({ $dom }, i) => {
    const handler = () => {
      if (timer) {
        clearTimeout(timer);
      }

      clickedList.push(i);

      timer = setTimeout(() => {
        console.log('debounced', clickedList);
        proxyStore.dispatch(
          updateClickedList(
            Array.from(new Set(clickedList)).sort((a, b) => a - b)
          )
        );
        clickedList = [];
      }, 500);
    };

    handlers.push({ $dom, handler });

    $dom.addEventListener('click', handler);
  });
};

initial();

const observer = new MutationObserver((mutations) => {
  if (mutations.length > 0) {
    setTimeout(() => {
      initial();
    }, 1500);
  }
});

const $html = document.querySelector('html');

if ($html instanceof HTMLHtmlElement) {
  observer.observe($html, { childList: true, subtree: true });
}
