import { createStoreProxy } from '../../store';
import type { Plane } from '../../types/Plane';
import PortNames from '../../types/PortNames';
import { updatePlanes } from '../../store/slices/content';

const proxyStore = createStoreProxy(PortNames.ContentPort);

const getPlaneDatas = () => {
  const $elements = Array.from(document.querySelectorAll('*')).filter(($el) => {
    const { height } = $el.getBoundingClientRect();

    const tagName = $el.tagName.toLowerCase();

    if (
      tagName === 'canvas' ||
      tagName === 'g' ||
      tagName === 'rect' ||
      tagName === 'path' ||
      tagName === 'polygon'
    ) {
      return false;
    }

    if (height === 0) {
      return false;
    }

    return true;
  });

  const maxWidth = Math.max(
    ...Array.from($elements).map(($el) => $el.getBoundingClientRect().width)
  );
  const maxHeight = Math.max(
    ...Array.from($elements).map(($el) => $el.getBoundingClientRect().height)
  );

  const planeDatas: Plane[] = [];

  $elements.forEach(($el) => {
    const { y, x, height, width } = $el.getBoundingClientRect();

    planeDatas.push({ dom: $el, y, x, height, width, maxWidth, maxHeight });
  });

  planeDatas.sort((a, b) => b.height - a.height);

  return planeDatas;
};

const planes = getPlaneDatas();

console.log(planes);

proxyStore.dispatch(updatePlanes(planes));

/*
setInterval(() => {
  if (!port) {
    return;
  }

  port.postMessage({ data: 'this is data' });
  console.log('메세지 전송 됨');
}, 1000);
  */
