import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Panel from './Panel';

import { createProxyStore } from '../../store';

import PortNames from '../../types/PortNames';
import { MESSAGE_TYPE } from '../../types/chrome';

import type { AnyAction } from '@reduxjs/toolkit';
import type { Store } from 'webext-redux';
import type { State } from '../../store/State';

const container = document.getElementById('app-container');
const root = createRoot(container!);
root.render(<StoreWrapper />);

function StoreWrapper() {
  const [store, setStore] = useState<Store<State, AnyAction> | null>(null);

  const initProxyStore = async () => {
    const proxyStore = createProxyStore(PortNames.ContentPort);
    await proxyStore.ready();
    setStore(proxyStore);
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((req) => {
      if (req.type === MESSAGE_TYPE.STORE_INITIALIZED) {
        initProxyStore();
      }
    });

    chrome.runtime.connect({ name: PortNames.PANEL });
  }, []);

  return (
    <div>
      {store && (
        <Provider store={store}>
          <Panel />
        </Provider>
      )}
    </div>
  );
}
