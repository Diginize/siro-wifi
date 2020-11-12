import {MessageRequest} from './abstract/message-request';
import {MessageSecure} from './abstract/message-secure';
import {DeviceCommand} from './abstract/device-command';
import {Device} from './abstract/device';
import {MessageData} from './abstract/message-data';

export interface WriteDevice extends MessageRequest, Device, MessageData<DeviceCommand>, MessageSecure {
    msgType: 'WriteDevice';
}
