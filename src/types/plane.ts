import type { Pick } from './util';

type Position = {
  y: number;
  x: number;
};

type Size = {
  width: number;
  height: number;
};

export interface Plane {
  $dom: Element;
  depth: number;
  pos: Position;
  size: Size;
  bgColor: string;
}

export interface PlaneTree {
  data: Plane[];
  child: PlaneTree[];
  zIndex: number;
  $root: Element | null;
}

export type ElementWithDepth = Pick<Plane, '$dom' | 'depth'>;

export type HandlerOfDom = {
  $dom: Element | Window;
  handler: () => void;
};
