import { Model } from '../../contracts/Model';
import type { Store } from 'webext-redux';
import type { Plane, ElementWithDepth } from '@/types/plane';
import type { AnyAction } from '@reduxjs/toolkit';
import { updatePlanes, updateCurrentHref } from '@/store/slices/content';

export type State = {
  store: Store | null;
  planes: Plane[];
  clickedList: number[];
};

export class PlaneModel implements Model<State> {
  state: State = { store: null, planes: [], clickedList: [] };

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
