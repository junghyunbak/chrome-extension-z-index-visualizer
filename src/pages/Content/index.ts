import { MESSAGE_TYPE, PORT_NAMES } from '@/constants';
import { createProxyStore } from '@/store';
import { updateCurrentHref, updatePlaneTree } from '@/store/slices/content';
import type { Plane, PlaneTree } from '@/types/plane';

/**
 * create proxy store
 */
const proxyStore = createProxyStore(PORT_NAMES.CONTENT_PORT);

/**
 * 요청 시 데이터 가공하여 redux store에 dispath
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === MESSAGE_TYPE.REQUEST_REFRESH_DATA) {
    createPlaneData();
  }
});

/**
 * ======================
 * 데이터 가공을 위한 함수들
 * ======================
 */
async function createPlaneData() {
  await proxyStore.ready();

  const $root = document.querySelector(':root');

  if (!($root instanceof Element)) {
    return;
  }

  /**
   * fixed 요소 분리
   */
  const result: Pick<Plane, '$dom' | 'depth'>[] = [{ $dom: $root, depth: 0 }];

  getFixedElement($root, result, 0);

  /**
   * root와 fixed 요소들에서 시작하여 재귀적으로 모든 요소 수집
   */
  const planeTree: PlaneTree = {
    data: [],
    child: [],
    $root: null,
    zIndex: 0,
  };

  result.forEach(({ $dom, depth }) => {
    const zIndex = window
      .getComputedStyle($dom, null)
      .getPropertyValue('z-index');

    const newPlaneNode: PlaneTree = {
      data: [],
      child: [],
      $root: $dom,
      zIndex: zIndex === 'auto' ? 0 : +zIndex,
    };

    planeTree.child.push(newPlaneNode);

    makePlaneTree(newPlaneNode, $dom, depth);
  });

  proxyStore.dispatch(updatePlaneTree(planeTree));
  proxyStore.dispatch(updateCurrentHref(window.location.href));
}

function getFixedElement(
  $curEl: Element,
  result: Pick<Plane, '$dom' | 'depth'>[],
  depth: number
) {
  const position = window
    .getComputedStyle($curEl, null)
    .getPropertyValue('position');

  if (position === 'fixed') {
    result.push({ $dom: $curEl, depth });
  }

  Array.from($curEl.children).forEach(($nextEl) => {
    getFixedElement($nextEl, result, depth + 1);
  });
}

function isExclude($el: Element): boolean {
  const { height } = $el.getBoundingClientRect();
  const tagName = $el.tagName.toLowerCase();

  if (tagName === 'span' || height === 0) {
    return true;
  }

  return false;
}

function makePlaneTree(node: PlaneTree, $curEl: Element, depth: number) {
  // 기저 사례
  if (isExclude($curEl)) {
    return;
  }

  const { y, x, height, width } = $curEl.getBoundingClientRect();

  const bgColor = window
    .getComputedStyle($curEl, null)
    .getPropertyValue('background-color');

  node.data.push({
    $dom: $curEl,
    depth,
    pos: { y, x },
    size: { height, width },
    bgColor,
  });

  // 재귀 호출
  Array.from($curEl.children).forEach(($nextEl) => {
    const position = window
      .getComputedStyle($nextEl, null)
      .getPropertyValue('position');

    switch (position) {
      case 'fixed':
        return;

      case 'static':
        makePlaneTree(node, $nextEl, depth + 1);
        break;

      default:
        const zIndex = window
          .getComputedStyle($nextEl, null)
          .getPropertyValue('z-index');

        const newPlaneNode = {
          data: [],
          child: [],
          zIndex: zIndex === 'auto' ? 0 : +zIndex,
          $root: $curEl,
        };

        node.child.push(newPlaneNode);

        makePlaneTree(newPlaneNode, $nextEl, depth + 1);
        break;
    }
  });
}
