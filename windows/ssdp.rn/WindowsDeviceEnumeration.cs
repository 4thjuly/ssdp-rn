using Newtonsoft.Json.Linq;
using ReactNative.Bridge;
using ReactNative.Collections;
using ReactNative.Modules.Core;
using ReactNative.UIManager;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;
using Windows.UI.Popups;
using Windows.Networking.Sockets;
using Windows.Networking;
using Windows.Storage.Streams;

namespace ReactNative.Modules.WindowsNetworkingSockets
{
    public class DatagramSocketModule : ReactContextNativeModuleBase
    {
        Dictionary<int, DatagramSocket> datagramSockets = new Dictionary<int, DatagramSocket>();

        public DatagramSocketModule(ReactContext reactContext) : base(reactContext)
        {
        }

        public override string Name { get { return "DatagramSocketModule"; } }

        [ReactMethod]
        public void Test(String msg)
        {
            Debug.WriteLine("Test: " + msg);
        }

        void OnMessageReceived(DatagramSocket socket, DatagramSocketMessageReceivedEventArgs eventArguments) {
            var dataReader = eventArguments.GetDataReader();
            var msg = dataReader.ReadString(dataReader.UnconsumedBufferLength);
            string remoteIp = eventArguments.RemoteAddress.CanonicalName;
            string remotePort = eventArguments.RemotePort;
            var reply = new JObject {
                { "address", remoteIp } ,
                { "port", remotePort },
                { "message", msg }
            };
            Context.GetJavaScriptModule<RCTDeviceEventEmitter>().emit("message-info", reply);
        }

        [ReactMethod]
        public void Create(IPromise promise)
        {
            try
            {
                var datagramSocket = new DatagramSocket();
                datagramSocket.MessageReceived += OnMessageReceived;
                int id = datagramSocket.GetHashCode();
                this.datagramSockets[id] = datagramSocket;
                promise.Resolve(id);
            }
            catch (Exception exc)
            {
                promise.Reject(exc);
            }
        }

        [ReactMethod]
        public void Destroy(int id)
        {
            this.datagramSockets.Remove(id);
        }


        [ReactMethod]
        public void JoinMulticastGroup(int id, String hostName)
        {
            var hn = new HostName(hostName);
            this.datagramSockets[id].JoinMulticastGroup(hn);
        }

        [ReactMethod]
        public async void WriteString(int id, String remoteHostname, String remoteServiceName, String msg, IPromise promise)
        {
            try
            {
                var datagramSocket = this.datagramSockets[id];
                var hostname = new HostName(remoteHostname);
                var outputStream = await datagramSocket.GetOutputStreamAsync(hostname, remoteServiceName);
                var writer = new DataWriter(outputStream);
                writer.WriteString(msg);
                await writer.StoreAsync();
                promise.Resolve(true);
            }
            catch (Exception exc)
            {
                promise.Reject(exc);
            }
        }
    }

    public class DatagramSocketPackage : IReactPackage
    {
        public IReadOnlyList<INativeModule> CreateNativeModules(ReactContext reactContext)
        {
            return new List<INativeModule>
            {
                new DatagramSocketModule(reactContext)
            };
        }

        public IReadOnlyList<Type> CreateJavaScriptModulesConfig()
        {
            return new List<Type>(0);
        }

        public IReadOnlyList<IViewManager> CreateViewManagers(ReactContext reactContext)
        {
            return new List<IViewManager>(0);
        }
    }
}