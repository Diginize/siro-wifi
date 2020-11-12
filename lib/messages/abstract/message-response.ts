import {DeviceTypes} from '../../enum/device-types';
import {Message} from './message';
import {MessageData} from './message-data';

export interface MessageResponse<T> extends Message, MessageData<T> {
    mac: string;
    deviceType: DeviceTypes;
}
