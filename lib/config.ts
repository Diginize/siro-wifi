export interface SiroWifiConfig {
    bridgeIp: string;
    bridgePort?: number; // the udp port to send messages to
    localPort?: number; // the udp port to listen to
    bridgeKey: string;
}

export const DefaultConfig: Partial<SiroWifiConfig> = {
    bridgePort: 32100,
    localPort: 32101
}
