import { PORT_NAMES } from '@/constants';

import ClickController from './controllers/ClickController';

import { createProxyStore } from '@/store';

const initialize = async () => {
  /**
   * create proxy store
   */
  const proxyStore = createProxyStore(PORT_NAMES.CONTENT_PORT);

  /**
   * register controller
   */
  const controllers = [new ClickController(proxyStore)];

  await proxyStore.ready();
  await Promise.all(controllers.map((controller) => controller.register()));
};

initialize();
