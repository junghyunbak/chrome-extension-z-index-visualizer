import type { HandlerOfDom, Plane } from '../../types/Plane';
import { createProxyStore } from '../../store';
import PortNames from '../../types/PortNames';
import { updateClickedList, updatePlanes } from '../../store/slices/content';
import {
  makePlaneObjects,
  collectHandler,
  observerAllDomChange,
} from '../../utils/dom';

const proxyStore = createProxyStore(PortNames.ContentPort);

const handlers: HandlerOfDom[] = [];

const attachHandler = (planes: Plane[]) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let clickedList: number[] = [];

  const createHandler = (index: number) => () => {
    clickedList.push(index);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      proxyStore.dispatch(
        updateClickedList(
          Array.from(new Set(clickedList)).sort((a, b) => a - b)
        )
      );
      clickedList = [];
    }, 500);
  };

  planes.forEach(({ $dom }, i) => {
    const handler = createHandler(i);

    handlers.push({ $dom, handler });

    $dom.addEventListener('click', handler);
  });

  const windowHandler = createHandler(-1);

  handlers.push({ $dom: window, handler: windowHandler });

  window.addEventListener('click', windowHandler);
};

const initial = async () => {
  const planes = makePlaneObjects();
  await proxyStore.dispatch(updatePlanes(planes));
  collectHandler('click', handlers);
  attachHandler(planes);
};

/**
 * 진입점(entry)
 */
(async () => {
  await proxyStore.ready();
  await initial();
  observerAllDomChange(initial);
})();
