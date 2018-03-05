// @flow
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { DatagramSocket } from './DatagramSocket';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
  windows: 'Press Shift+F10 to open the debug menu.',
});

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
        <Text style={styles.welcome}>
          Welcome to React Native! (v0.0.1)
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }

  async componentDidMount() {
    let socket = new DatagramSocket();
    await socket.create();
    //socket.joinMultiCastGroup(SSDP_IP);
    setInterval(() => {
      console.log('Sending');
      socket.writeString(BROADCAST_IP, SSDP_PORT, SSDP_SEARCH);
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
