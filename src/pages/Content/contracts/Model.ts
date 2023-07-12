import { Store } from 'webext-redux';

type ChangeToOptional<T> = {
  [k in keyof T]?: T[k];
};

export interface Model<T> {
  state: T;

  initState(): void;

  getState(): T;

  setState(newState: ChangeToOptional<T>): void;
}
