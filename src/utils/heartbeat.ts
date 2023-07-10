const CYCLE = 2 * 60 * 1000;

export const startHeartBeat = (): void => {
  let portToBackground: chrome.runtime.Port | undefined =
    openPortToBackground();

  function openPortToBackground(): chrome.runtime.Port {
    const port = chrome.runtime.connect();
    console.log('connecting', port);

    const timeout = setTimeout(() => {
      portToBackground = openPortToBackground();

      port.disconnect();
    }, CYCLE);

    port.onDisconnect.addListener(() => {
      clearTimeout(timeout);
      if (port !== portToBackground) {
        return;
      }
    });

    return port;
  }
};
