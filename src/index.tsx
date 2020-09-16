import { NativeModules } from 'react-native';

type SabpaisaType = {
  multiply(a: number, b: number): Promise<number>;
  getPayURL(name: Object): Promise<string>;
  decryptURL(authKey: string, authVI: string, url: string): Promise<string>;
};

const { Sabpaisa } = NativeModules;

export default Sabpaisa as SabpaisaType;
