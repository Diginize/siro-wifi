import {DeviceTypes} from '../../enum/device-types';

export interface Device {
    mac: string;
    deviceType: DeviceTypes;
}
