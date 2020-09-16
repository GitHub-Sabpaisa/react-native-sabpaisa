package com.reactnativesabpaisa

// sabpisa imports starts
// import android.content.Context;
// import android.content.Intent;
// import android.widget.Toast;

import android.net.Uri
import com.facebook.react.bridge.*
import java.security.InvalidKeyException
import java.security.NoSuchAlgorithmException
import java.util.*
import javax.crypto.Cipher
import javax.crypto.Mac
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

class SabpaisaModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

//  lateinit var mapNow: HashMap<String?, String?>

    override fun getName(): String {
        return "Sabpaisa"
    }

    // Example method
    // See https://facebook.github.io/react-native/docs/native-modules-android
    @ReactMethod
    fun multiply(a: Int, b: Int, promise: Promise) {

      promise.resolve(a * b)
    }

  @ReactMethod
  fun getPayURL(readableMap: ReadableMap, promise: Promise) {

//      var mapReq: HashMap<String?, String?>

    var mapReq: HashMap<String?, String?> =
      HashMap<String?, String?> ()

    //  mapReq.put("authKey", readableMap.getString("authKey"))

         mapReq["authKey"] = readableMap.getString("authKey")
         mapReq["authIV"] = readableMap.getString("authIV")
         mapReq["username"] = readableMap.getString("username")
         mapReq["password"] = readableMap.getString("password")
         mapReq["clientCode"] = readableMap.getString("clientCode")
         mapReq["URLsuccess"] = readableMap.getString("URLsuccess")
         mapReq["URLfailure"] = readableMap.getString("URLfailure")
         mapReq["spHitUrl"] = readableMap.getString("spHitUrl")
         mapReq["txnAmt"] = readableMap.getString("txnAmt")
         mapReq["payerFirstName"] = readableMap.getString("payerFirstName")
         mapReq["payerLastName"] = readableMap.getString("payerLastName")
         mapReq["payerContact"] = readableMap.getString("payerContact")
         mapReq["payerEmail"] = readableMap.getString("payerEmail")
         mapReq["payerAddress"] = readableMap.getString("payerAddress")
         mapReq["txnId"] = readableMap.getString("txnId")

    val finalURL: String? = getURL(mapReq)

  //  promise.resolve("hello " + readableMap.getString("payerFirstName") + " !!!")
    promise.resolve(finalURL)
  }

  fun getURL(map: HashMap<String?, String?>): String? {
//    mapNow = map
    val checksumMap = HashMap<String, String?>()
    checksumMap["clientName"] = map["clientCode"]
    checksumMap["usern"] = map["username"]
    checksumMap["pass"] = map["password"]
    checksumMap["amt"] = map["txnAmt"]
    checksumMap["txnId"] = map["txnId"]
    checksumMap["firstName"] = map["payerFirstName"]
    checksumMap["lstName"] = map["payerLastName"]
    checksumMap["contactNo"] = map["payerContact"]
    checksumMap["Email"] = map["payerEmail"]
    checksumMap["Add"] = map["payerAddress"]
    checksumMap["ru"] = map["URLsuccess"]
    checksumMap["failureURL"] = map["URLfailure"]
    checksumMap["channelId"] = "m"
    val checksumString = calculateChecksum(map["authKey"].toString()!!, checksumMap)
    val baseUrl = ("?clientName=" + map["clientCode"] +
      "&usern=" + map["username"] + "&pass=" + map["password"] +
      "&amt=" + map["txnAmt"] + "&txnId=" + map["txnId"] +
      "&firstName=" + map["payerFirstName"] + "&lstName=" + map["payerLastName"] +
      "&contactNo=" + map["payerContact"] + "&Email=" + map["payerEmail"] +
      "&Add=" + map["payerAddress"] + "&ru=" + map["URLsuccess"] +
      "&failureURL=" + map["URLfailure"] + "&channelId=m" +
      "&checkSum=" + checksumString)

    val encryptedUrlEl = encryptURL(map["authKey"].toString()!!, map["authIV"].toString()!!, baseUrl)

    val finalURL = (map["spHitUrl"].toString() + "?query=" +
      encryptedUrlEl + "&clientName=" + map["clientCode"]).replace("+", "%2B")
    println("final url $finalURL")
    return finalURL
  }

  fun encryptURL(authKey: String, authVI: String, url: String): String? {
    return try {
      val ivParameterSpec = IvParameterSpec(authVI.toByteArray(charset("UTF-8")))
      val secretKeySpec = SecretKeySpec(authKey.toByteArray(charset("UTF-8")), "AES")
      val cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING")
      cipher.init(1, secretKeySpec, ivParameterSpec)
      val var4: ByteArray
      var4 = cipher.doFinal(url.toByteArray())
      println("String: " + android.util.Base64.encodeToString(var4, 0))
      android.util.Base64.encodeToString(var4, 0)
    } catch (e: Exception) {
      e.printStackTrace().toString()
//      String("empty")
    }
  }

   @ReactMethod
  fun decryptURL(key: String, iv: String, url: String, promise: Promise) {
     try {
       val query = Uri.parse(url).getQueryParameter("query")
      val var3 = IvParameterSpec(iv.toByteArray(charset("UTF-8")))
      val var5 = SecretKeySpec(key.toByteArray(charset("UTF-8")), "AES")
      val cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING")
      cipher.init(2, var5, var3)
      val decryptedString = cipher.doFinal(android.util.Base64.decode(query, 0))
      // String(decryptedString)
      promise.resolve(String(decryptedString))
    } catch (e: Exception) {
      e.printStackTrace().toString()
    }
  }

  fun calculateChecksum(secretKey: String, postData: HashMap<String, String?>): String? {
    var data = ""
    val keys: SortedSet<String> = TreeSet(postData.keys)
    for (key in keys) {
      data = data + key + postData[key]
    }
    println("Client side before checkSum string : $data")
    var sha256_HMAC: Mac? = null
    try {
      sha256_HMAC = Mac.getInstance("HmacSHA256")
    } catch (e1: NoSuchAlgorithmException) {
      e1.printStackTrace()
    }
    val secret_key_spec = SecretKeySpec(secretKey.toByteArray(), "HmacSHA256")
    try {
      sha256_HMAC!!.init(secret_key_spec)
    } catch (e: InvalidKeyException) {
      e.printStackTrace()
    }
    val encodedBytes = android.util.Base64.encodeToString(sha256_HMAC!!.doFinal(data.toByteArray()), 0)
    println("Check sum : $encodedBytes")
    return encodedBytes
  }

//  fun mapResponse(var0: String?): Map<String?, String?>? {
//    val var8: LinkedHashMap<*, *> = LinkedHashMap<Any?, Any?>()
//    val var1: LinkedHashMap<*, *> = LinkedHashMap<Any?, Any?>()
//    var var2: Array<String?>?
//    var var3 = var0!!.split("&".toRegex()).toTypedArray().also { var2 = it }.size
//    try {
//      var var5: String?
//      for (var4 in 0 until var3) {
//        var var6: Int
//        var var7: String?
//        if (var2!![var4].also { var5 = it }!!.indexOf("=").also { var6 = it } > 0) {
//          var7 = URLDecoder.decode(var5!!.substring(0, var6), "UTF-8")
//        } else {
//          var7 = var5
//        }
//        if (!var8.containsKey(var7)) {
//          var8.put(var7, new LinkedList())
//        }
//        label44@{
//          if (var6 > 0) {
//            val var10000 = var5!!.length
//            ++var6
//            if (var10000 > var6) {
//              var5 = URLDecoder.decode(var5!!.substring(var6), "UTF-8")
//              break@label44
//            }
//          }
//          var5 = null
//        }
//        (var8[var7] as MutableList<*>?)!!.add(var5)
//      }
//      val var9: ArrayList<*> = ArrayList(var8.keys)
//      var3 = 0
//      while (var3 < var9.size) {
//        var var11: List<*>?
//        if ((var8[var9[var3] as String?. also { var5 = it }] as MutableList<*>?. also { var11 = it }).size == 0) {
//          var1[var5] = ""
//        } else {
//          var1[var5] = var11!![0] as String?
//        }
//        ++var3
//      }
//    } catch (var9: Exception) {
//      var9.printStackTrace()
//    }
//    return var1
//  }
}
