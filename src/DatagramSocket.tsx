const wns = require('NativeModules').DatagramSocketModule;
const NativeEventEmitter = require('NativeEventEmitter');
const datagramSocketEventEmitter = new NativeEventEmitter(wns);
 
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

    on(event:string, callback:(string) => void) {
        datagramSocketEventEmitter.addListener(event, (msgInfo) => { 
            callback(msgInfo);
        } );
    }

    async bindEndpointAsync(localHostName:string, localServiceName:string) {
        return await wns.BindEndpointAsync(this.id, localHostName, localServiceName);
    }

    async SetControlMulticastOnly(value:boolean) {
        return await wns.SetControlMulticastOnly(this.id, value);
    }

    async bindServiceNameAsync(localServiceName:string) {
        return await wns.BindServiceNameAsync(this.id, localServiceName);
    }
}
