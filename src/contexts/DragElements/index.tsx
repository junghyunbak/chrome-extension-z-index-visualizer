import type { MutableRefObject } from 'react';
import { createContext } from 'react';

type DragElements = MutableRefObject<
  MutableRefObject<HTMLDivElement | null>[]
> | null;

export const DragElementsContext = createContext<DragElements>(null);
