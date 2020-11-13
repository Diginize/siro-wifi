import {Operations} from '../../enum/operations';

export interface DeviceCommand {
    operation?: Operations;
    targetPosition?: number;
    targetAngle?: number;
}
