import {MessageResponse} from './abstract/message-response';
import {Device} from './abstract/device';

export interface GetDeviceListAck extends MessageResponse<Device[]> {
    msgType: 'GetDeviceList';
    ProtocolVersion: string;
    token: string;
}
