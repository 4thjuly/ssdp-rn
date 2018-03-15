// @flow
import * as React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { DatagramSocket } from './DatagramSocket';

const SSDP_IP = '239.255.255.250';
const BROADCAST_IP = '255.255.255.255'; // Espruino doesnt support multicase address yet
const SSDP_PORT = '1900';

interface State {
  text:string;
}

export default class App extends React.Component<object, State> {
  state:State = {text:'1) Starting'};
  line:number = 1;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}> 
          <Text style={styles.text} >{this.state.text}</Text>
        </ScrollView>
      </View>
    );
  }

  onMsgInfo = (msgInfo) => {
    let ip = msgInfo.address;
    let port = msgInfo.port;
    if (msgInfo.message.includes('urn:schemas-reszolve-com:device:espruino:1')) {
      let msg = 'SocketMsg from Espruino ' + ip + ' ' + port;
      console.log(msg);
      this.addText(msg);
    } else {
      console.log('.');
      // this.addText('.');
    }
  }

  addText(text) {
    this.line++;
    let newText:string = this.line + ') ' + text + '\r\n' + this.state.text;
    this.setState({text:newText});
  }

  async componentDidMount() {
    let socket = new DatagramSocket();
    await socket.create();
    socket.on('message-info', this.onMsgInfo);
    await socket.SetControlMulticastOnly(true);
    await socket.bindServiceNameAsync(SSDP_PORT);
    await socket.joinMultiCastGroup(SSDP_IP);
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
  scrollView: {
    flex: 1
  }
});
