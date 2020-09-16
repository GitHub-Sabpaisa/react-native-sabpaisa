#import <React/RCTBridgeModule.h>
//#import <CryptoSwift.h>
//import CryptoSwift
@interface RCT_EXTERN_MODULE(Sabpaisa, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getPayURL:( NSDictionary )nsObj
withResolver:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

@end
