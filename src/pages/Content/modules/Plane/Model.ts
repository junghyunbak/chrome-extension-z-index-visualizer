import { Model } from '../../contracts/Model';
import type { Store } from 'webext-redux';
import type { Plane, PlaneTree } from '@/types/plane';
import type { AnyAction } from '@reduxjs/toolkit';
import { updateCurrentHref, updatePlaneTree } from '@/store/slices/content';
import { Pick } from '@/types/util';

export type State = {
  store: Store | null;
  planeTree: PlaneTree;
  clickedList: number[];
};

export class PlaneModel implements Model<State> {
  state: State = {
    store: null,
    clickedList: [],
    planeTree: { data: [], child: [], $root: null, zIndex: 0 },
  };

  constructor(store: Store) {
    this.state.store = store;
    this.state.planeTree = { data: [], child: [], $root: null, zIndex: 0 };
    this.initState();
  }

  initState(): void {
    const { store } = this.state;

    if (!store) {
      return;
    }

    const $root = document.querySelector(':root');

    if (!($root instanceof Element)) {
      return;
    }

    /**
     * fixed 요소 분리
     */
    const result: Pick<Plane, '$dom' | 'depth'>[] = [{ $dom: $root, depth: 0 }];

    this.getFixedElement($root, result, 0);

    /**
     * root와 fixed 요소들에서 시작하여 재귀적으로 모든 요소 수집
     */
    result.forEach(({ $dom, depth }) => {
      const zIndex = window
        .getComputedStyle($dom, null)
        .getPropertyValue('z-index');

      const newPlaneNode = {
        data: [],
        child: [],
        $root: $dom,
        zIndex: zIndex === 'auto' ? 0 : +zIndex,
      };

      this.state.planeTree.child.push(newPlaneNode);

      this.makePlaneTree(newPlaneNode, $dom, depth);
    });

    store.dispatch(updatePlaneTree(this.state.planeTree));
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

  getFixedElement(
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
      this.getFixedElement($nextEl, result, depth + 1);
    });
  }

  isExclude($el: Element): boolean {
    const { height } = $el.getBoundingClientRect();
    const tagName = $el.tagName.toLowerCase();

    if (tagName === 'span' || height === 0) {
      return true;
    }

    return false;
  }

  makePlaneTree(node: PlaneTree, $curEl: Element, depth: number) {
    // 기저 사례
    if (this.isExclude($curEl)) {
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
          this.makePlaneTree(node, $nextEl, depth + 1);
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

          this.makePlaneTree(newPlaneNode, $nextEl, depth + 1);
          break;
      }
    });
  }
}
