import type { HandlerOfDom } from '@/types/plane';
import { Model } from './Model';

export interface Controller<T> {
  model: Model<T> | null;

  handlers: HandlerOfDom[];

  register(): Promise<void>;

  attachHandler(): Promise<void>;

  collectHandler(): void;
}
