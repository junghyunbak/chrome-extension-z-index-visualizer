import type { MutableRefObject } from 'react';
import { createContext } from 'react';

/**
 * useRef는 훅이기 때문에 함수 컴포넌트 외부에서 사용할 수 없다.
 * createContext의 defaultValue로 넘겨줄 때 에도 마찬가지이므로
 * optional property로 설정해주었다.
 */
interface DragContextValues {
  isMousePress?: MutableRefObject<boolean>;
  prevPosX?: MutableRefObject<number>;
  prevPosY?: MutableRefObject<number>;
  $target?: MutableRefObject<HTMLElement | null>;
}

export const DragContext = createContext<DragContextValues>({});
