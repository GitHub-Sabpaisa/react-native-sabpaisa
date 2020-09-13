import { NativeModules } from 'react-native';

type SabpaisaType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Sabpaisa } = NativeModules;

export default Sabpaisa as SabpaisaType;
