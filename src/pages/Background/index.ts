import { buildOriginStore } from '@/store';
import { MESSAGE_TYPE, PORT_NAMES } from '@/constants';
import { getPrivousState } from '@/utils/chrome';

(async () => {
  /**
   * chrome 저장소의 이전 상태를 가져와 redux 저장소를 초기화한다.
   */
  const previousState = await getPrivousState();

  buildOriginStore({
    portName: PORT_NAMES.CONTENT_PORT,
    preloadedState: previousState,
  });

  /**
   * service worker가 idle -> active 상태로 변할 때 마다
   * panel로 메세지를 보내어 proxyStore를 초기화 하도록 함.
   *
   * panel이 하나도 열려있지 않은 상태일 땐 오류가 발생함. (해결 필요)
   */
  chrome.runtime.sendMessage({ type: MESSAGE_TYPE.STORE_INITIALIZED });
})();
