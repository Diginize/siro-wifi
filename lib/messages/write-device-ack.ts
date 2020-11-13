import {MessageResponse} from './abstract/message-response';
import {DeviceStatus} from './abstract/device-status';

export interface WriteDeviceAck extends MessageResponse<DeviceStatus> {
    msgType: 'WriteDeviceAck';
    actionResult?: 'AccessToken error';
}
