// @flow
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { DatagramSocket } from './DatagramSocket';

const SSDP_SEARCH = [
  'M-SEARCH * HTTP/1.1', 
  'HOST: 239.255.255.250:1900',
  'MAN: "ssdp:discover"',
  'MX: 1',
  'ST: ssdp:all',
  ''
].join('\r\n');

// const SSDP_IP = '239.255.255.250';
const BROADCAST_IP = '255.255.255.255'; // Espruino doesnt support multicase address yet
const SSDP_PORT = '1900';

export default class App extends React.Component<object, object> {

  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.welcome}> Sending M-SEARCH </Text>
      </View>
    );
  }

  onMsgInfo = (msgInfo) => {
    let ip = msgInfo.address;
    // let msg = msgInfo.message.split('\r\n')[0];
    if (msgInfo.message.includes('EspruinoWifi')) {
      console.log(`socketMsg: \r\n${msgInfo.message})`);
    }
  }

  async componentDidMount() {
    let socket = new DatagramSocket();
    await socket.create();
    socket.on('message-info', this.onMsgInfo);
    //socket.joinMultiCastGroup(SSDP_IP);
    setInterval(() => {
      console.log('Sending');
      // socket.writeString(BROADCAST_IP, SSDP_PORT, 'M-SEARCH * HTTP/1.1'); // Works
      // socket.writeString('10.0.0.187', SSDP_PORT, 'M-SEARCH * HTTP/1.1'); // Works
      // socket.writeString('10.0.0.187', SSDP_PORT, SSDP_SEARCH); // Crashes Esp
      socket.writeString(BROADCAST_IP, SSDP_PORT, SSDP_SEARCH); // Crashes Esp
    }, 5000);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
