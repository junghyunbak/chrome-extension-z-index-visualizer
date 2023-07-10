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

export type ElementWithDepth = Pick<Plane, '$dom' | 'depth'>;

export type HandlerOfDom = {
  $dom: Element;
  handler: () => void;
};
