// @flow
import * as React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
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

interface State {
  text:string;
}

export default class App extends React.Component<object, State> {
  state:State = {text:'Starting'};

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} > 
        <Text style={styles.text} >{this.state.text}</Text>
      </ScrollView>
    );
  }

  onMsgInfo = (msgInfo) => {
    let ip = msgInfo.address;
    if (msgInfo.message.includes('EspruinoWifi')) {
      // let msg = `socketMsg: \r\n${msgInfo.message})`;
      let msg = 'SocketMsg from ' + ip;
      console.log(msg);
      this.addText(msg);
    }
  }

  addText(text) {
    let newText:string = text + '\r\n' + this.state.text;
    this.setState({text:newText});
  }

  async componentDidMount() {
    let socket = new DatagramSocket();
    await socket.create();
    socket.on('message-info', this.onMsgInfo);
    setInterval(() => {
      console.log('Sending');
      this.addText('Sending');
      socket.writeString(BROADCAST_IP, SSDP_PORT, SSDP_SEARCH); // Crashes Esp
    }, 5000);
    this.addText('Started');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  text: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
  },
});
