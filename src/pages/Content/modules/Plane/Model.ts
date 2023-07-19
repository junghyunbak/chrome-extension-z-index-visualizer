import { Model } from '../../contracts/Model';
import type { Store } from 'webext-redux';
import type { Plane, ElementWithDepth, PlaneTree } from '@/types/plane';
import type { AnyAction } from '@reduxjs/toolkit';
import { updatePlanes, updateCurrentHref, updatePlaneTree } from '@/store/slices/content';

export type State = {
  store: Store | null;
  planes: Plane[];
  planeTree: PlaneTree;
  clickedList: number[];
};

export class PlaneModel implements Model<State> {
  state: State = {
    store: null,
    planes: [],
    clickedList: [],
    planeTree: { data: [], child: [], $root: null, zIndex: 0 },
  };

  constructor(store: Store) {
    this.state.store = store;
    this.initState();
  }

  initState(): void {
    this.state.planes = this.makePlaneObjects();

    const { store } = this.state;

    if (!store) {
      return;
    }

    store.dispatch(updatePlanes(this.state.planes));
    store.dispatch(updateCurrentHref(window.location.href));

    console.log('before', this.state.planes);

    // test
    const $root = document.querySelector(':root');

    if (!($root instanceof Element)) {
      return;
    }

    const result: Element[] = [$root];

    this.getFixedElement($root, result);

    console.log('fixed element', result);

    this.state.planeTree = { data: [], child: [], $root: null, zIndex: 0 };

    result.forEach(($el) => {
      const zIndex = window
        .getComputedStyle($el, null)
        .getPropertyValue('z-index');

      const newPlaneNode = {
        data: [],
        child: [],
        $root: $el,
        zIndex: zIndex === 'auto' ? 0 : +zIndex,
      };

      this.state.planeTree.child.push(newPlaneNode);

      this.makePlaneTree(newPlaneNode, $el);
    });

    store.dispatch(updatePlaneTree(this.state.planeTree));
  }

  setState(newState: {
    store?: Store<any, AnyAction> | null | undefined;
    planes?: Plane[] | undefined;
    clickedList?: number[] | undefined;
  }): void {
    this.state = { ...this.state, ...newState };
  }

  getState(): State {
    return this.state;
  }

  getFixedElement($curEl: Element, result: Element[]) {
    const position = window
      .getComputedStyle($curEl, null)
      .getPropertyValue('position');

    if (position === 'fixed') {
      result.push($curEl);
    }

    Array.from($curEl.children).forEach(($nextEl) => {
      this.getFixedElement($nextEl, result);
    });
  }

  getPlaneObject($el: Element): Plane {
    const { y, x, height, width } = $el.getBoundingClientRect();
    const bgColor = window
      .getComputedStyle($el, null)
      .getPropertyValue('background-color');

    /**
     * $dom, depth는 임시 값
     */
    return {
      $dom: $el,
      depth: 0,
      pos: { y, x },
      size: { height, width },
      bgColor,
    };
  }

  isExclude($el: Element): boolean {
    const { height } = $el.getBoundingClientRect();
    const tagName = $el.tagName.toLowerCase();

    if (tagName === 'span' || height === 0) {
      return true;
    }

    return false;
  }

  makePlaneTree(node: PlaneTree, $curEl: Element) {
    // 기저 사례
    if (this.isExclude($curEl)) {
      return;
    }

    const plane = this.getPlaneObject($curEl);

    node.data.push(plane);

    // 재귀 호출
    Array.from($curEl.children).forEach(($nextEl) => {
      const position = window
        .getComputedStyle($nextEl, null)
        .getPropertyValue('position');

      switch (position) {
        case 'fixed':
          return;

        case 'static':
          this.makePlaneTree(node, $nextEl);
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

          this.makePlaneTree(newPlaneNode, $nextEl);
          break;
      }
    });
  }

  getElementsWidthDepth(
    $curEl: Element,
    depth: number,
    result: ElementWithDepth[]
  ) {
    result.push({ $dom: $curEl, depth });

    Array.from($curEl.children).forEach(($nextEl) => {
      this.getElementsWidthDepth($nextEl, depth + 1, result);
    });
  }

  makePlaneObjects(): Plane[] {
    const planes: Plane[] = [];

    const $root = document.querySelector(':root');

    if (!$root) {
      return [];
    }

    const tmp: ElementWithDepth[] = [];

    this.getElementsWidthDepth($root, 0, tmp);

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

      if (tagName === 'span' || height === 0) {
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
  }
}
