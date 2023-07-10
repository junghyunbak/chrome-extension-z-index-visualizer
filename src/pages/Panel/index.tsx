import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Panel from './Panel';
import type { AnyAction } from '@reduxjs/toolkit';

import { createProxyStore } from '../../store';
import PortNames from '../../types/PortNames';
import { Store } from 'webext-redux';
import { State } from '../../store/State';

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
    initProxyStore();
  }, []);

  return (
    <div>
      {store && (
        <Provider store={store}>
          <Panel initProxyStore={initProxyStore} />
        </Provider>
      )}
    </div>
  );
}
