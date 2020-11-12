import {DefaultConfig, SiroWifiConfig} from './config';
// @ts-ignore
import * as unicast from 'unicast';
import {Writable} from 'stream';
import {MessageResponse} from './messages/abstract/message-response';
import {MessageRequest} from './messages/abstract/message-request';
import * as aesjs from 'aes-js';

export class BridgeConnector {

    private socket: any;
    private messagePipeline: {[msgId: string]: (message: any) => void} = {};
    private token: string;
    private accessToken: string;

    constructor(
        private readonly config: SiroWifiConfig
    ) {
        this.config = {
            ...DefaultConfig,
            ...this.config
        };

        this.openConnection();
    }

    public openConnection(): void {
        this.socket = unicast.createSocket({
            type: 'udp4',
            port: this.config.localPort,
            remotePort: this.config.bridgePort,
            remoteAddress: this.config.bridgeIp
        });

        const converter = new Writable();
        converter._write = (data: Buffer) => this.messageReader(data);
        this.socket.pipe(converter);
    }

    public closeConnection(): void {
        this.socket.close();
    }

    public sendMessage<T extends MessageRequest, D, R extends MessageResponse<D>>(message: T, expectedReturnType: string = message.msgId, timeout: number = 10): Promise<R> {
        return new Promise<R>(((resolve, reject) => {
            let messageResolved = false;
            let timedOut = false;

            this.messagePipeline[expectedReturnType] = (message: R) => {
                if (timedOut) {
                    return;
                }

                messageResolved = true;
                resolve(message);
            };

            const writeSuccess = this.socket.write(JSON.stringify(message));
            if (!writeSuccess) {
                reject('Interface write error.');
                return;
            }

            setTimeout(() => {
                if (!messageResolved) {
                    timedOut = true;
                    reject();

                    delete this.messagePipeline[expectedReturnType];
                }
            }, 1000 * timeout);
        }))
    }

    private messageReader(dataPart: Buffer): void {
        const message: MessageResponse<any> = JSON.parse(dataPart.toString());

        if (message.msgType && this.messagePipeline[message.msgType]) {
            this.messagePipeline[message.msgType](message);
            delete this.messagePipeline[message.msgType];
        }
    }

    public setToken(token: string): void {
        this.token = token;

        // calculate access token
        const key = this.config.bridgeKey.split('').map((char) => char.charCodeAt(0));
        const textBytes = aesjs.utils.utf8.toBytes(this.token);
        const aesEcb = new aesjs.ModeOfOperation.ecb(key);
        const encryptedBytes = aesEcb.encrypt(textBytes);
        this.accessToken = aesjs.utils.hex.fromBytes(encryptedBytes);
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

}
