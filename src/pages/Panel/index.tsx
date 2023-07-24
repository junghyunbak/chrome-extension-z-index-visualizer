/** @jsxImportSource @emotion/react */
import React, { ReactNode, useEffect, useState } from 'react';
import type { AnyAction } from '@reduxjs/toolkit';
import type { Store } from 'webext-redux';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Global } from '@emotion/react';
import * as S from './index.styles';

import Panel from './Panel';

import type { State } from '@/store/State';
import { createProxyStore } from '@/store';

import { MESSAGE_TYPE, PORT_NAMES } from '@/constants';

const container = document.getElementById('app-container');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Global styles={S.global} />
    <StoreWrapper>
      <Panel />
    </StoreWrapper>
  </React.StrictMode>
);

function StoreWrapper({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store<State, AnyAction> | null>(null);

  const initProxyStore = async () => {
    const proxyStore = createProxyStore(PORT_NAMES.CONTENT_PORT);
    await proxyStore.ready();
    setStore(proxyStore);
  };

  useEffect(() => {
    initProxyStore();

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === MESSAGE_TYPE.STORE_INITIALIZED) {
        initProxyStore();
      }
    });
  }, []);

  return <div>{store && <Provider store={store}>{children}</Provider>}</div>;
}
