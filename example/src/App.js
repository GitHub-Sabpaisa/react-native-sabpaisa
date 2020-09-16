import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Sabpaisa from 'react-native-sabpaisa';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  webview = null;

  constructor(props) {
    super(props);
    // navigation = this.props.navigation
    this.state = {
      url: '',
      pgDetails: {
        // these all are mandatory params for the payment gateway
        username: 'bhabesh.jha_2211', // your username
        password: 'DEMO1_SP2211', // your password
        clientCode: 'DEMO1', // your client code
        authKey: 'nqwPqlvl1N712ZWj', // your auth key
        authIV: 'Is8W6uq1cWz980iO', // your auth vi
        URLsuccess: 'https://sabpaisa.in/',
        URLfailure: 'https://sabpaisa.in/',
        spHitUrl: 'https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit',
        txnId: Math.floor(Math.random() * Math.floor(9999)).toString(), // unique transaction id for each request
        txnAmt: '10', // amount
        payerFirstName: 'John', // first name of the customer
        payerLastName: 'Doe', // last name of the customer
        payerContact: '1111111111', // 10 digit mobile number of the customer
        payerEmail: 'abc@example.com', // email address of the customer
        payerAddress: 'test', // address of the customer
      },
    };
  }
  componentDidMount() {
    Sabpaisa.getPayURL(this.state.pgDetails).then((res) => {
      console.log('getPayURL');
      console.log(res);
      this.setState({ url: 'https://www.google.com' });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={(ref) => (this.webview = ref)}
          style={styles.webview}
          source={{ uri: this.state.url }}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
      </View>
    );
  }

  handleWebViewNavigationStateChange = (newNavState, props) => {
    const { url } = newNavState;
    if (!url) return;
    // this.props.navigation.replace("ShowTransactionSummary");

    console.log(url);
    if (url.includes('&clientCode=') && url.includes('&transDate')) {
      Sabpaisa.decryptURL(
        this.state.pgDetails.authKey,
        this.state.pgDetails.authIV,
        url
      ).then((res) => {
        console.log('res');
        console.log(res);
        this.props.navigation.replace('ShowTransactionSummary', {
          details: res,
        });
      });
    }
  };

  getParams = (url) => {
    var params = {};
    // var parser = document.createElement('a');
    // parser.href = url;
    // var query = parser.search.substring(1);
    var vars = toString(url).split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    console.log('params');
    console.log(params);
    return params;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
