// @flow
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
// import { Client } from 'react-native-ssdp';
import * as Sockets from '@nodert-win10-cu/windows.networking.sockets';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
  windows: 'Press Shift+F10 to open the debug menu.',
});

export default class App extends React.Component<object, object> {
  // client;

  constructor(props) {
    super(props);
    // this.client = new Client();
  }

  componentDidMount() {
    console.log('componentDidMount sockets: ', Sockets);
    // let socket = new Sockets.DatagramSocket();

    // this.client.on('response', function (headers, statusCode, rinfo) {
    //   console.log('Got a response to an m-search.');
    // });
    // this.client.search('ssdp:all');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to React Native! (v0.0.1) </Text>
        <Text style={styles.instructions}> To get started, edit App.js </Text>
        <Text style={styles.instructions}> {instructions} </Text>
      </View>
    );
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
