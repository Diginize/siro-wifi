import {MessageResponse} from './abstract/message-response';
import {DeviceStatus} from './abstract/device-status';

export interface WriteDevice extends MessageResponse<DeviceStatus> {
    msgType: 'WriteDeviceAck';
}
