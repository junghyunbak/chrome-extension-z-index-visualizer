import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Panel from './Panel';

import { createProxyStore } from '../../store';

import PortNames from '../../types/PortNames';
import { MESSAGE_TYPE } from '../../types/chrome';

chrome.runtime.connect({ name: PortNames.PANEL });

const initPanel = async () => {
  const proxyStore = createProxyStore(PortNames.ContentPort);

  await proxyStore.ready();

  const container = document.getElementById('app-container');
  const root = createRoot(container!);
  root.render(
    <Provider store={proxyStore}>
      <Panel />
    </Provider>
  );
};

chrome.runtime.onMessage.addListener((req) => {
  if (req.type === MESSAGE_TYPE.STORE_INITIALIZED) {
    initPanel();
  }
});
