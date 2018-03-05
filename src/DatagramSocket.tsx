const wns = require('NativeModules').DatagramSocketModule;

export class DatagramSocket {
    id:number;

    async create() {
        this.id = await wns.Create();
    }

    destroy() {
        wns.destroy(this.id);
        this.id = undefined;
    }

    async writeString(remoteHostName:string, remoteServiceName:string, msg:string) {
        return await wns.WriteString(this.id, remoteHostName, remoteServiceName, msg);
    }

    joinMultiCastGroup(hostName:string) {
        wns.JoinMulticastGroup(this.id, hostName);
    }
}
