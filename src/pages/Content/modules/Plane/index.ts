import { Controller } from '@/pages/Content/contracts/Controller';
import { PlaneModel } from './Model';
import type { HandlerOfDom } from '@/types/plane';
import type { Model } from '@/pages/Content/contracts/Model';
import type { State } from './Model';
import { Store } from 'webext-redux';
import { debounce } from '@/utils';
import { updateClickedList } from '@/store/slices/content';

class PlaneModule implements Controller<State> {
  model: Model<State> | null = null;

  handlers: HandlerOfDom[] = [];

  constructor(store: Store) {
    this.model = new PlaneModel(store) as Model<State>;
    console.log('new plane module', this.model);
  }

  async register(): Promise<void> {
    await this.attachHandler();
    this.observeAllDomChange();
  }

  async attachHandler(): Promise<void> {
    console.log('attach handler');
    if (!this.model) {
      return;
    }

    const { store, planes } = this.model.getState();

    if (!store) {
      return;
    }

    await store.ready();

    this.model.initState();

    this.collectHandler();

    planes.forEach(({ $dom }, i) => {
      const handler = this.createHandler(i);
      this.handlers.push({ $dom, handler });
      $dom.addEventListener('click', handler);
    });

    const windowHandler = this.createHandler(-1);
    this.handlers.push({ $dom: window, handler: windowHandler });
    window.addEventListener('click', windowHandler);
  }

  collectHandler(): void {
    while (this.handlers.length) {
      const top = this.handlers.pop();

      if (!top) {
        continue;
      }

      const { $dom, handler } = top;

      $dom.removeEventListener('click', handler);
    }
  }

  createHandler = (index: number) => () => {
    if (!this.model) {
      return;
    }

    const state = this.model.getState();

    if (!state) {
      return;
    }

    const { clickedList } = state;

    this.model.setState({ clickedList: [...clickedList, index] });

    debounce(this.updateClickedListDebounceCallback.bind(this), 500)();
  };

  updateClickedListDebounceCallback() {
    if (!this.model) {
      return;
    }

    const { store, clickedList } = this.model.getState();

    store?.dispatch(
      updateClickedList(Array.from(new Set(clickedList)).sort((a, b) => a - b))
    );

    this.model.setState({ clickedList: [] });
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

export default PlaneModule;
