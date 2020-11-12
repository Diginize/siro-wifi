import {Devices} from '../../enum/devices';
import {Operations} from '../../enum/operations';
import {CurrentState} from '../../enum/current-state';
import {VoltageModes} from '../../enum/voltage-modes';
import {WirelessModes} from '../../enum/wireless-modes';

export interface DeviceStatus {
    type: Devices;
    operation: Operations;
    currentPosition: number;
    currentAngle: number;
    currentState: CurrentState;
    voltageMode: VoltageModes;
    batteryLevel: number;
    wirelessMode: WirelessModes;
    RSSI: number;
}
