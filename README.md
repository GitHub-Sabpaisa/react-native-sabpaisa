# react-native-sabpaisa

This package is used to integrate sabpaisa payment gateway with your react native application.

## Installation

You can add SabPaisa SDK to your existing React Native project using following npm command: -

```sh
npm install react-native-sabpaisa
```

## Example

Request for payment link -> open webview -> get response

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Sabpaisa from 'react-native-sabpaisa';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  webview = null;

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      pgDetails: {
        // these all are mandatory params for the payment gateway
        username: '', // your username
        password: '', // your password
        clientCode: '', // your client code
        authKey: '', // your auth key
        authIV: '', // your auth vi
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
```
## Show Transaction Summary

```sh
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class ShowTransactionSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseString: '',
      responseObject: {},
    };
  }
  componentDidMount() {
    this.setState({ responseString: this.props.route.params.details });
    console.log('from show transaction');
    console.log(this.state.responseString);

    var params = {};
    var vars = this.props.route.params.details.toString().split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    console.log(params);
    this.setState({ responseObject: params });
  }
  render() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}
          >
            {' '}
            Transaction Summary{' '}
          </Text>
          {Object.keys(this.state.responseObject).length === 0 ? (
            <Text>Response array is empty</Text>
          ) : (
            <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20 }}>
              <Text>PGTxnNo : {this.state.responseObject.PGTxnNo}</Text>
              <Text>
                SabPaisaTxId : {this.state.responseObject.SabPaisaTxId}
              </Text>
              <Text>amount : {this.state.responseObject.amount}</Text>
              <Text>
                orgTxnAmount : {this.state.responseObject.orgTxnAmount}
              </Text>
              <Text>reMsg : {this.state.responseObject.reMsg}</Text>
              <Text>clientTxnId : {this.state.responseObject.clientTxnId}</Text>

              <Text style={{ marginTop: 20 }}>
                COMPLETE RESPONSE STRING : {this.state.responseString}
              </Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1, marginTop: 150, marginHorizontal: 20 }}>
          <Button
            title="Try Another Transaction"
            onPress={() => {
              this.props.navigation.replace('Home');
            }}
          />
        </View>
      </>
    );
  }
}
```


## Example Code

See the [example project](example) to see how to implement react-native-sabpaisa to any React Native Project


## License

MIT
