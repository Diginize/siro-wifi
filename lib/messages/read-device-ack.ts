import {MessageResponse} from './abstract/message-response';
import {DeviceStatus} from './abstract/device-status';

export interface ReadDeviceAck extends MessageResponse<DeviceStatus> {
    msgType: 'ReadDeviceAck';
}
