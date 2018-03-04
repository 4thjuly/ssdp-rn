const wde = require('NativeModules').WindowsDevicesEnumerationModule;

export class Client {
    
    test(msg:string):void {
        wde.Test(msg);
    }

}

