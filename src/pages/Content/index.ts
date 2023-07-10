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

let clickedList: number[] = [];
const handlers: HandlerOfDom[] = [];

const attachHandler = (planes: Plane[]) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  planes.forEach(({ $dom }, i) => {
    const handler = () => {
      if (timer) {
        clearTimeout(timer);
      }

      clickedList.push(i);

      timer = setTimeout(() => {
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
