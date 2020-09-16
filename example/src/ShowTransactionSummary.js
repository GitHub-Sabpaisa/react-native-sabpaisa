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
    // var respTestString = "pgRespCode=0300&PGTxnNo=345911609200487051&SabPaisaTxId=345911609200487051&issuerRefNo=101202026005224646&authIdCode=0&amount=21.0&clientTxnId=2584&firstName=John&lastName=Doe&payMode=Debit Card&email=abc@example.com&mobileNo=1111111111&spRespCode=0300&cid=NA&bid=NA&clientCode=DEMO1&payeeProfile=null&transDate=2020-09-16 04:27:09.0&spRespStatus=FAILED&m3=NA&challanNo=null&reMsg=Sorry, Your Transaction has Failed.&orgTxnAmount=10.0&programId=DEMO1&midName=NA&Add=test&param1=NA&param2=NA&param3=NA&param4=NA&udf5=NA&udf6=NA&udf7=NA&udf8=NA&udf9=null&udf10=null&udf11=null&udf12=null&udf13=null&udf14=null&udf15=null&udf16=null&udf17=null&udf18=null&udf19=null&udf20=null";
    // console.log(respTestString)
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
