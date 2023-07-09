import buildStoreWithDefaults from '../../store';
import PortNames from '../../types/PortNames';

buildStoreWithDefaults({ portName: PortNames.ContentPort });

/*
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    console.log('received msg: ', msg);
  });
});
*/
