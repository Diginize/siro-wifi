import {Message} from './message';

export interface MessageRequest extends Message {
    msgID: string;
}
