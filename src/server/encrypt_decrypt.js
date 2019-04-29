/* eslint-disable */
import aesjs from 'aes-js'
import { Base64 } from 'js-base64'

// 加密方法
// word                 ---需要加密的数据
// accountParam(16位)   ---加密的salt(与解密的salt一致),初始登录时是登录账号(不足16位,补零)
export function Encrypt (data, key) {
  key = aesjs.utils.utf8.toBytes(key)
  key = getRawKey(key)
  var iv = key
  var textBytes = aesjs.utils.utf8.toBytes(data)
  textBytes = aesjs.padding.pkcs7.pad(textBytes)
  var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)
  var encryptedBytes = aesCbc.encrypt(textBytes)
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  var encryptedBase64 = Base64.encode(encryptedHex)
  return encryptedBase64
}

export function Decrypt (data, key) {
  key = aesjs.utils.utf8.toBytes(key)
  key = getRawKey(key)
  var iv = key
  var encryptedHex = Base64.decode(data)
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)
  var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)
  var decryptedText = aesCbc.decrypt(encryptedBytes)
  var decryptedStr = aesjs.utils.utf8.fromBytes(aesjs.padding.pkcs7.strip(decryptedText))
  return formatDecryptedText(decryptedStr)
}

function getRawKey (key) {
  var result = []
  for (var i = 1; i <= key.length; i += 2) {
    result.push(key[i])
  }
  return aesjs.utils.utf8.toBytes(aesjs.utils.utf8.fromBytes(result))
}

// function formatEncryptedText (str) {
//   let result = encodeURIComponent(str)
//   return result
// }

function formatDecryptedText (str) {
  let result = decodeURIComponent(str)
  result = result.replace('+', ' ')
  return result
}
