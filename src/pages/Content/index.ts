import { PORT_NAMES } from '@/constants';

import PlaneModule from './modules/Plane';

import { createProxyStore } from '@/store';

const initialize = async () => {
  /**
   * create proxy store
   */
  const proxyStore = createProxyStore(PORT_NAMES.CONTENT_PORT);

  /**
   * register modules
   */
  const modules = [new PlaneModule(proxyStore)];

  await proxyStore.ready();
  await Promise.all(modules.map((module) => module.register()));
};

initialize();
