import { Controller } from '@/pages/Content/contracts/Controller';
import { PlaneModel } from './Model';
import type { HandlerOfDom } from '@/types/plane';
import type { Model } from '@/pages/Content/contracts/Model';
import type { State } from './Model';
import { Store } from 'webext-redux';

class PlaneModule implements Controller<State> {
  model: Model<State> | null = null;

  handlers: HandlerOfDom[] = [];

  constructor(store: Store) {
    this.model = new PlaneModel(store) as Model<State>;
  }

  async register(): Promise<void> {
    await this.attachHandler();
  }

  async attachHandler(): Promise<void> {}

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

  createHandler = (index: number) => () => {};
}

export default PlaneModule;
