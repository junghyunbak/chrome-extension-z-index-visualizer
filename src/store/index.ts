import { Store, wrapStore } from 'webext-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import content from './slices/content';

import type { State } from './State';

export const createProxyStore = (portName: string) => {
  const store = new Store<State, AnyAction>({ portName });

  // Fix for unresolved bug in webext-redux: https://github.com/tshaddix/webext-redux/issues/286
  Object.assign(store, {
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
  });

  return store;
};

const buildStoreWithDefaults = ({ portName }: { portName: string }) => {
  const reducer = combineReducers({
    content,
  });

  const store = configureStore({
    devTools: true,
    reducer,
    middleware: [logger],
  });

  if (portName) {
    wrapStore(store, { portName });
  }
};

export default buildStoreWithDefaults;
