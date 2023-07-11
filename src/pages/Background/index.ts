import buildStoreWithDefaults from '../../store';
import PortNames from '../../types/PortNames';
import { MESSAGE_TYPE } from '../../types/chrome';

/**
 * service worker가 idle상태로 전환되기 때문에 다음과 같은 경우에서 매번 아래의 코드들이 실행된다.
 *
 *  - 처음 실행될 때
 *  - idle 상태에서 깨어날 때
 */

/**
 * idle 상태에서 깨어날 때 기존의 상태를 복구하기 위해 chrome storage를 사용하는 코드를 추가할 예정
 */
buildStoreWithDefaults({ portName: PortNames.ContentPort });

/**
 * 아래 두 경우에 모두 실행되기 위해서 onConnect의 콜백 함수에 작성해주었다.
 *
 * - idle 상태에서 깨어날 때
 * - panel이 실행되었을 때
 */
chrome.runtime.onConnect.addListener((port) => {
  chrome.runtime.sendMessage({ type: MESSAGE_TYPE.STORE_INITIALIZED });
});
