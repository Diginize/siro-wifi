import {Message} from './message';

export interface MessageRequest extends Message {
    msgId: string;
}
