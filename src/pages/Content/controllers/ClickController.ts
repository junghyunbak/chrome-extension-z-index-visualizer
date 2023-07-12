import type { Store } from 'webext-redux';
import type { HandlerOfDom, Plane } from '@/types/plane';
import { debounce } from '@/utils';
import { updateClickedList } from '@/store/slices/content';
import { updateCurrentHref, updatePlanes } from '@/store/slices/content';
import { makePlaneObjects } from '@/utils/dom';

class ClickController {
  store: Store | null = null;
  planes: Plane[] = [];
  handlers: HandlerOfDom[] = [];
  clickedList: number[] = [];

  constructor(store: Store) {
    this.store = store;
  }

  async register() {
    await this.attachHandler();
    this.observeAllDomChange();
  }

  async attachHandler() {
    if (!this.store) {
      return;
    }

    await this.store.ready();

    this.collectHandler();

    /**
     * planes 데이터를 생성하고 갱신하는 로직은 컨트롤러라는 이름에 맞지 않는 것 같다.
     */
    this.planes = makePlaneObjects();
    await this.store.dispatch(updatePlanes(this.planes));
    await this.store.dispatch(updateCurrentHref(window.location.href));

    this.planes.forEach(({ $dom }, i) => {
      const handler = this.createHandler(i);
      this.handlers.push({ $dom, handler });
      $dom.addEventListener('click', handler);
    });

    const windowHandler = this.createHandler(-1);
    this.handlers.push({ $dom: window, handler: windowHandler });
    window.addEventListener('click', windowHandler);
  }

  createHandler = (index: number) => () => {
    this.clickedList.push(index);

    debounce(this.updateClickedListDebounceCallback.bind(this), 500)();
  };

  updateClickedListDebounceCallback() {
    this.store?.dispatch(
      updateClickedList(
        Array.from(new Set(this.clickedList)).sort((a, b) => a - b)
      )
    );

    this.clickedList = [];
  }

  collectHandler() {
    while (this.handlers.length) {
      const top = this.handlers.pop();

      if (!top) {
        continue;
      }

      const { $dom, handler } = top;

      $dom.removeEventListener('click', handler);
    }
  }

  observeAllDomChange() {
    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(() => {
      const domChange = debounce(this.attachHandler.bind(this), 1500);

      domChange();
    });

    const $html = document.querySelector('html');

    if ($html instanceof HTMLHtmlElement) {
      observer.observe($html, config);
    }
  }
}

export default ClickController;
