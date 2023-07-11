import type { HandlerOfDom } from '@/types/plane';

export const collectHandler = (eventName: string, handlers: HandlerOfDom[]) => {
  while (handlers.length) {
    const top = handlers.pop();

    if (!top) {
      continue;
    }

    const { $dom, handler } = top;

    $dom.removeEventListener(eventName, handler);
  }
};
