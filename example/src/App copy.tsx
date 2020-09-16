import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Sabpaisa from 'react-native-sabpaisa';


function setParams() { // this format should be remain same
  
  return {
    username: "bhabesh.jha_2211", // your username
    password: "DEMO1_SP2211", // your password
    clientCode: "DEMO1", // your client code
    authKey: "nqwPqlvl1N712ZWj", // your auth key
    authIV: "Is8W6uq1cWz980iO", // your auth vi
    URLsuccess: "https://sabpaisa.in/", // you can change it to yours (optional)
    URLfailure: "https://sabpaisa.in/", // you can change it to yours (optional)
    spHitUrl: "https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit",
    txnId: (Math.floor(Math.random() * Math.floor(9999))).toString(),
    txnAmt: "10",
    payerFirstName: "Yash",
    payerLastName: "Tripathi",
    payerContact: "9406635588",
    payerEmail: "yashtripathiindia@gmail.com",
    payerAddress: "test address",

  }

}

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [name, setName] = React.useState<string | undefined>();

  React.useEffect(() => {
    Sabpaisa.multiply(3, 7).then(setResult);
    Sabpaisa.getPayURL(setParams()).then( res => {
      console.log(res);
      // setName(res);
      setName(res)
    }
      
    );
  }, []);



  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
