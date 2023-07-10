import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Panel from './Panel';

import { createProxyStore } from '../../store';
import PortNames from '../../types/PortNames';

const proxyStore = createProxyStore(PortNames.ContentPort);

proxyStore.ready().then(() => {
  const container = document.getElementById('app-container');
  const root = createRoot(container!);
  root.render(
    <Provider store={proxyStore}>
      <Panel />
    </Provider>
  );
});
