import { Store, wrapStore } from 'webext-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import { setItemsToChromeStorage } from '@/utils/chrome';

import content from './slices/content';
import size from './slices/size';

import type { State } from './State';

export const createProxyStore = (portName: string) => {
  const store = new Store<State, AnyAction>({ portName });

  /**
   * webext-redux 오류 해결을 위한 코드
   * https://github.com/tshaddix/webext-redux/issues/286
   */
  Object.assign(store, {
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
  });

  return store;
};

/**
 * preloadedState - chrome storage에 저장한 값의 타입을 어떻게 지정하는 지 몰라 일단 any로 설정
 */
export const buildOriginStore = ({
  portName,
  preloadedState,
}: {
  portName: string;
  preloadedState: any;
}) => {
  const reducer = combineReducers({
    content,
    size,
  });

  const store = configureStore({
    devTools: true,
    reducer,
    middleware: [logger],
    preloadedState,
  });

  if (portName) {
    wrapStore(store, { portName });
  }

  store.subscribe(() => {
    setItemsToChromeStorage({ state: store.getState() });
  });
};
