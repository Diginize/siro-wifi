import {MessageRequest} from './abstract/message-request';
import {Device} from './abstract/device';

export interface ReadDevice extends MessageRequest, Device {
    msgType: 'ReadDevice';
}
