// import CryptoSwift

@objc(Sabpaisa)
class Sabpaisa: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
     @objc(getPayURL:withResolver:withRejecter:)
     func getPayURL(nsObj: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        
//        for (key, value) in nsObj {
//            resolve("Value: \(value) for key: \(key)")
//            return;
//        }
        let name = nsObj["payerFirstName"]
        resolve("Under Development")
     }
    
//
//    let userName = "bhabesh.jha_2211"
//    let password = "DEMO1_SP2211"
//    let txnId = "12311";
//    let clientCode = "DEMO1";
//    let authKey = "nqwPqlvl1N712ZWj";
//    let authIV = "Is8W6uq1cWz980iO";
//    var txnAmt = "";
//    let successUrl = "https://sabpaisa.in";
//    let failureUrl = "https://sabpaisa.in";
//    var payerFirstName = "";
//    var payerLastName = "";
//    var payerContact = "";
//    var payerEmail = "";
//    var payerAddress = "";
//    let auth = false;
//
//    var aes: AES!
    
    
//    aes = try AES.init(key: authKey, iv: authIV)
    
    
//    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
//        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
//    }
//
//    required init?(coder: NSCoder) {
//        super.init(coder: coder)
//    }

        

    
//    func getChecksumString() -> String {
//        let message = "clientName\(clientCode)usern\(userName)&pass=\(password)&amt=\(txnAmt)&txnId=\(randomString(length: 10))&firstName=\(payerFirstName)&lstName=\(payerLastName)&contactNo=\(payerContact)&Email=\(payerEmail)&Add=\(payerAddress)&ru=\(successUrl)&failureURL=\(failureUrl)"
//        let checksum = try! HMAC(key: authKey, variant: .sha256).authenticate(message.bytes)
//        print("checksum : "+checksum.toBase64()!)
//        return checksum.toBase64()!
//    }
//    
//    func getEncyptedQueryString() -> String {
//        
//        let query = "?clientName=\(clientCode)&usern=\(userName)&pass=\(password)&amt=\(txnAmt)&txnId=\(randomString(length: 10))&firstName=\(payerFirstName)&lstName=\(payerLastName)&contactNo=\(payerContact)&Email=\(payerEmail)&Add=\(payerAddress)&ru=\(successUrl)&failureURL=\(failureUrl)&checkSum=\(getChecksumString())"
//        print("nonEncrptedQuery :"+query)
//        do {
//            let ciperText = try aes.encrypt(query.bytes)
//            return ciperText.toBase64()!
//        } catch {
//            return ""
//        }
//    }
    
//    private func loadWebViewRequest() {
//
//        activityIndicator.startAnimating()
//        let urlString = "https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?query=\(getEncyptedQueryString().replacingOccurrences(of: "+", with: "%2B"))&clientName=\(clientCode)"
//
//        if let requestUrl = URL(string: urlString) {
//            webView.navigationDelegate = self
//            webView.uiDelegate = self
//            let request = URLRequest(url: requestUrl)
//            webView.load(request)
//        }
//    }
}
