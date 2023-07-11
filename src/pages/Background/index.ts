import buildStoreWithDefaults from '@/store';
import { PORT_NAMES, MESSAGE_TYPE } from '@/constants';

/**
 * service worker가 idle상태로 전환되기 때문에 다음과 같은 경우에서 매번 아래의 코드들이 실행된다.
 *
 *  - 처음 실행될 때
 *  - idle 상태에서 깨어날 때
 */

/**
 * idle 상태에서 깨어날 때 기존의 상태를 복구하기 위해 chrome storage를 사용하는 코드를 추가할 예정
 */
buildStoreWithDefaults({ portName: PORT_NAMES.CONTENT_PORT });

/**
 * panel은 service worker가 동작중(idle 상태가 아닐 때)일 때 사용할 수 있다.
 *
 * 1) panel 보다 먼저 - 첫 실행
 * 2) panel 보다 늦게 - idle 상태에서 깨어날 때
 *
 * 아래는 두 경우 모두 service worker가 준비되었음을 panel에게 알리기 위한 코드이다.
 */

// 1)
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === PORT_NAMES.PANEL) {
    chrome.runtime.sendMessage({ type: MESSAGE_TYPE.STORE_INITIALIZED });
  }
});

// 2)
chrome.runtime.sendMessage({ type: MESSAGE_TYPE.STORE_INITIALIZED });
