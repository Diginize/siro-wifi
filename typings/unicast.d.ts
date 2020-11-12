import * as dgram from 'dgram';
import {Duplex} from 'stream';

export declare namespace unicast {

    export interface UnicastOptions {
        type: 'udp4'|'udp6',
        port?: number,
        remotePort?: number,
        remoteAddress?: string,
        socket?: dgram.Socket,
        messagesFilter?: (socket: Socket, message: Buffer, rinfo: Object) => boolean,
        closeTransport?: boolean,
    }

    export class Socket extends Duplex {

        readonly localAddress: string;
        readonly localPort: number;
        remoteAddress: string;
        remotePort: number;

        constructor(options: UnicastOptions);

        close(): void;

        unshift(message: Buffer): boolean;

        process(message: Buffer): boolean;

    }

    export function createSocket(options: UnicastOptions): Socket;
    export function createSocket(socket: dgram.Socket, options: UnicastOptions): Socket;

}
