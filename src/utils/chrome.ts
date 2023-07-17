/*
TODO: 테스트 코드 작성 후 아래의 코드로 리팩토링

export const getPrivousState = async () => {
  const storage = await chrome.storage.local.get();

  return storage.state;
};
*/
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
