import {MessageRequest} from './abstract/message-request';

export interface GetDeviceList extends MessageRequest {
    msgType: 'GetDeviceList';
}
