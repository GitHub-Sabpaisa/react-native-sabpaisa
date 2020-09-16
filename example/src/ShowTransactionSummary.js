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
