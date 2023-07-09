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
}
