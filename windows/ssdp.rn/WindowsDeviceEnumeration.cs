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

namespace ReactNative.Modules.WindowsDevicesEnumeration
{
    public class WindowsDevicesEnumerationModule : ReactContextNativeModuleBase
    {
        public WindowsDevicesEnumerationModule(ReactContext reactContext) : base(reactContext)
        {
        }

        public override string Name { get { return "WindowsDevicesEnumerationModule"; } }

        [ReactMethod]
        public void Test(String msg)
        {
            Debug.WriteLine("Test: " + msg);
        }
    }

    public class WindowsDevicesEnumerationPackage : IReactPackage
    {
        public IReadOnlyList<INativeModule> CreateNativeModules(ReactContext reactContext)
        {
            return new List<INativeModule>
            {
                new WindowsDevicesEnumerationModule(reactContext)
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