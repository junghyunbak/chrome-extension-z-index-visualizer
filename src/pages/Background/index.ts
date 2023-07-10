import buildStoreWithDefaults from '../../store';
import PortNames from '../../types/PortNames';
import { startHeartBeat } from '../../utils/heartbeat';

buildStoreWithDefaults({ portName: PortNames.ContentPort });

startHeartBeat();
