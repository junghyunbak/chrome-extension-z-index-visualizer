export const getPrivousState = async () => {
  const previousState = await new Promise((resolve) => {
    chrome.storage.local.get('state', (storage) => {
      const state = storage.state;

      resolve(state);
    });
  });

  return previousState;
};

export const setItemsToChromeStorage = (items: { [key: string]: any }) => {
  chrome.storage.local.set(items);
};
