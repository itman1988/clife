import md5 from 'md5'
import Cookie from './cookie'
import ajax from './handleAjax'
import TimeUtils from './timeUtils'
import validityUtils from './validate'
import { Decrypt } from './encrypt_decrypt'
import Config, { AccountType } from '../constants/config.es6'
import $ from 'jquery'
import localstorage from './localTimeOver.js'

const ENCRYPTKEY = Config.ENCRYPTKEY

// 获取AccountType对应的key
function getAccountTypeKey (accountType) {
  for (var key in AccountType) {
    if (AccountType[key] === accountType) {
      return key
    }
  }
}
// 显示文本处理工具
function starReplaceStr (str, replace = '*') {
  let result = '' + str
  const start = 1
  const len = result.length - 2
  const replaceStr = replace
  if (result && result.length >= 3) {
    result = result.split('')
    result.splice(start, len, ...replaceStr.repeat(len).split(''))
    result = result.join('')
  } else {
    result = result.split('')
    result.splice(start, 1, replaceStr.repeat(1))
    result = result.join('')
  }
  return result
}
// 电话/邮箱显示处理
function starReplaceMob (str, replace = '*') {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  let result = '' + str
  const replaceStr = replace
  if (myreg.test(str)) {
    const start = 3
    const len = result.length - 7
    result = result.split('')
    result.splice(start, len, ...replaceStr.repeat(len).split(''))
    result = result.join('')
  } else {
    if (String(str).indexOf('@') > 0) {
      const email = str.split('@')
      const start = 1
      const len = email[0].length - 2
      result = email[0].split('')
      result.splice(start, len, ...replaceStr.repeat(len).split(''))
      result = result.join('')
      result = result + '@' + email[1]
    }
  }
  return result
}

// 提供基本类型用户请求数据；
function getUserRequestData (accountType, formValue) {
  let userRequestData
  switch (accountType) {
    case AccountType.mobileNo:
      userRequestData = {
        queryType: '5',
        resultFlag: '3',
        mobileNo: formValue
      }
      break
    case AccountType.emailAddress:
      userRequestData = {
        queryType: '6',
        resultFlag: '3',
        emailAddress: formValue
      }
      break
    case AccountType.certiNo:
      userRequestData = {
        queryType: '4',
        resultFlag: '3',
        certiType: '01',
        certiNo: formValue
      }
      break
    case AccountType.userCode:
      userRequestData = {
        queryType: '3',
        resultFlag: '3',
        userCode: formValue
      }
      break
    default:
      // console.log('账户类型：', this.accountType, '无法识别')
  }
  // console.log(userRequestData)
  return userRequestData
}

function getLoginRequestData (accountType, account, password, loginMethod) {
  let accountTypeKey = getAccountTypeKey(accountType)
  let loginData = {
    [accountTypeKey]: account,
    resultFlag: '2',
    loginTime: TimeUtils.getFormatTime(Date.parse(new Date()))
  }
  if (loginMethod === 0) {
    loginData['userPsw'] = md5(password).toUpperCase()
  } else {
    loginData['validateCode'] = password
  }

  switch (accountType) {
    case AccountType.mobileNo:
      if (loginMethod === 0) {
        loginData['loginType'] = '2'
      } else if (loginMethod === 1) {
        loginData['loginType'] = '3'
      } else {
        // console.log('手机未验真')
      }
      break
    case AccountType.emailAddress:
      if (loginMethod === 0) {
        loginData['loginType'] = '4'
      } else if (loginMethod === 1) {
        loginData['loginType'] = '5'
      } else {
        // console.log('邮箱未验真')
      }
      break
    case AccountType.certiNo:
      loginData['loginType'] = '6'
      break
    case AccountType.userCode:
      loginData['loginType'] = '1'
      break
    default:
      // console.log(accountType, ' 类型未定义')
  }
  return loginData
}
function getAccountType (value) {
  const { RegExpStr } = validityUtils
  let name = ''
  value = value.trim()
  if (RegExp(RegExpStr.mobileNo).test(value)) {
    name = AccountType.mobileNo
  } else if (RegExp(RegExpStr.emailAddress).test(value)) {
    name = AccountType.emailAddress
  } else if (RegExp(RegExpStr.certiNo).test(value)) {
    name = AccountType.certiNo
  } else {
    name = AccountType.userCode
  }
  return name
}
// 接口封装
function afterLoginSuccessHanlde (userInfo, sharedState, success) {
  const { userCode, oldUserId, userip } = userInfo
  if (sharedState && (typeof sharedState === 'object')) {
    const { optype, status } = sharedState
    const shareData = {
      oldUserId,
      optype,
      section: '1',
      status,
      opdate: TimeUtils.getFormatTime(Date.parse(new Date()))
    }
    shareState(shareData)
  }
  const tokenAccessData = {
    grantType: '02'
  }
  // 单点登录接口
  getAccessTocken(tokenAccessData, (accessToken) => {
    // console.log(this.accessToke)
    const tokenLoginData = {
      accessToken,
      oldUserId: oldUserId,
      loginType: '01'
    }
    Cookie.setCookie('accessToken', '', -1)
    accessTokenLogin(tokenLoginData, () => {
      // cookie;
      Cookie.setCookie({
        'accessToken': accessToken
      })
      localstorage.setAge(30 * 60 * 1000).set('accessToken', accessToken)
      // sessionStorage.setItem('accessToken', accessToken)
      const ip = userip
      const activatedData = {
        userType: '2',
        oldUserId,
        userCode,
        behaviorCode: '01001',
        ip,
        actionTime: TimeUtils.getFormatTime(Date.parse(new Date()))
      }
      collectUserAction(activatedData)
      success && success()
    })
  })
}
function afterRegisterSuccessHanlde (userInfo, success) {
  const { oldUserId, ip } = userInfo
  // 共享信息接口
  const shareData = {
    oldUserId,
    optype: '0',
    section: '1',
    status: '1',
    opdate: TimeUtils.getFormatTime(Date.parse(new Date()))
  }
  shareState(shareData)
  const tokenAccessData = {
    grantType: '02'
  }
  // 单点登录接口
  Cookie.setCookie('accessToken', '', -1)
  getAccessTocken(tokenAccessData, (accessToken) => {
    const tokenLoginData = {
      accessToken,
      oldUserId,
      loginType: '01'
    }
    accessTokenLogin(tokenLoginData, () => {
      // cookie;
      Cookie.setCookie({
        'accessToken': accessToken
      })
      localstorage.setAge(30 * 60 * 1000).set('accessToken', accessToken)
    })
  })
  const UserInfoData = {
    queryType: '2',
    resultFlag: '2',
    oldUserId
  }
  getUserInfo(UserInfoData, (userCode) => {
    const activatedData = {
      userType: '2',
      oldUserId,
      'userCode': userCode.userCode,
      ip,
      behaviorCode: '01001',
      actionTime: TimeUtils.getFormatTime(Date.parse(new Date()))
    }
    collectUserAction(activatedData)
    success && success(userCode.userCode)
  })
  // 月活接口
}
function collectUserAction (requestData) {
  ajax.getXhrPromise(
    'collectUserAction',
    'POST',
    requestData
  ).then(({ response }) => {
    const result = Decrypt(response, ENCRYPTKEY)
    const { respCode } = JSON.parse(
      result
    )
    if (respCode) {
      // console.log(respCode)
    }
  })
}
function shareState (requestData) {
  ajax.getXhrPromise(
    'shareState',
    'POST',
    requestData
  ).then(({ response }) => {
    const result = Decrypt(response, ENCRYPTKEY)
    const { respCode } = JSON.parse(
      result
    )
    if (respCode) {
      // console.log(respCode)
    }
  })
}

function getShareState (requestData, success) {
  ajax.getXhrPromise(
    'getShareState',
    'POST',
    requestData
  ).then(({ response }) => {
    const result = Decrypt(response, ENCRYPTKEY)
    const { respCode } = JSON.parse(
      result
    )
    if (respCode === '01') {
      success && success(respCode)
    } else if (respCode === '31') {
      success && success(respCode)
    } else {
    }
  })
}
function getAccessTocken (requestData, success, unsign) {
  ajax
    .getXhrPromise(
      'accessToken',
      'POST',
      requestData
    )
    .then(({ response }) => {
      const token = Decrypt(response, ENCRYPTKEY)
      const { respCode, accessToken, errorMsg, expiresIn } = JSON.parse(
        token
      )
      if (respCode === '01') {
        success && success(accessToken, expiresIn)
      } else {
        unsign && unsign(errorMsg)
      }
    })
}
function getUserInfo (requestData, success, error) {
  ajax
    .getXhrPromise(
      'getUserInfo',
      'POST',
      requestData
    )
    .then(({ response }) => {
      const user = Decrypt(response, ENCRYPTKEY)
      const { respCode, userInfo, errorMsg, userInfoList } = JSON.parse(
        user
      )
      if (respCode === '01') {
        if (userInfoList) {
          error && error({errorMsg: '该用户拥有多个数据，请联系客服', respCode: '49'})
        } else if (userInfo) {
          success && success(userInfo)
        } else {
          error && error(errorMsg)
        }
      } else if (respCode === '08') {
        error && error({errorMsg, respCode})
      } else {
        error && error({errorMsg: '请求报文为空', respCode: '49'})
      }
    })
}

function getValidateCode (requestData, success, error, compensate) {
  const {validateCodeType} = requestData
  ajax
    .getXhrPromise(
      'getValidateCode',
      'POST',
      requestData
    )
    .then(({ response }) => {
      const captch = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg } = JSON.parse(captch)
      if (respCode === '01') {
        success && success()
      } else if (respCode === '49' && (validateCodeType === '01' || validateCodeType === '03')) {
        compensate && compensate(errorMsg)
      } else if (respCode === '31' && (validateCodeType === '02' || validateCodeType === '04')) {
        compensate && compensate(errorMsg)
      } else {
        error && error(errorMsg)
      }
    })
}

function checkValidateCode (requestData, success, error) {
  ajax.getXhrPromise(
    'checkValidateCode',
    'POST',
    requestData
  )
    .then(({ response }) => {
      const captchCheckResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg } = JSON.parse(captchCheckResult)
      if (respCode === '01') {
        success && success()
      } else {
        error && error({respCode, errorMsg})
      }
    })
}

function userRegist (requestData, success, error) {
  ajax
    .getXhrPromise('userRegist', 'POST', requestData)
    .then(({ response }) => {
      const registResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg, oldUserId } = JSON.parse(registResult)
      if (respCode === '01') {
        success && success(oldUserId)
      } else if (respCode === '49') {
        error && error(errorMsg)
      } else {
        error && error(errorMsg)
      }
    })
}

function userLogin (requestData, success, error) {
  ajax.getXhrPromise(
    'userLogin',
    'POST',
    requestData
  )
    .then(({ response }) => {
      const loginResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg, userInfo } = JSON.parse(loginResult)
      if (respCode === '01') {
        success && success(userInfo)
      } else {
        error && error({errorMsg, respCode})
      }
    })
}

function accessTokenLogin (requestData, success, error) {
  ajax.getXhrPromise(
    'accessTokenLogin',
    'POST',
    requestData
  )
    .then(({ response }) => {
      const loginResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg, userInfo } = JSON.parse(loginResult)
      if (respCode === '01') {
        success && success(userInfo)
      } else {
        error && error({respCode, errorMsg})
      }
    })
}
function updateUserPsw (requestData, success, error) {
  ajax
    .getXhrPromise('updateUserPsw', 'POST', requestData)
    .then(({ response }) => {
      const resetResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg } = JSON.parse(resetResult)
      if (respCode === '01') {
        success && success()
      } else if (respCode === '14') {
        error && error(errorMsg)
      } else {
        error && error(errorMsg)
      }
    })
}

function getWechatAccessToken (code, success, fail) {
  $.ajax({
    url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${Config.APPID}&secret=${Config.APPSECRET}&code=${code}&grant_type=authorization_code`,
    type: 'GET',
    dataType: 'json'
  })
    .done((res) => {
      success && success(res)
    })
    .fail(res => {
      fail && fail(res)
    })
}

function getWechatUserInfo (requestData, success, fail) {
  const {token, openid} = requestData
  $.ajax({
    url: `https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}`,
    type: 'GET',
    dataType: 'json'
  })
    .done((res) => {
      success && success(res)
    })
    .fail(res => {
      fail && fail(res)
    })
}
function thirdLogin (requestData, success, fail, compensate) {
  ajax
    .getXhrPromise('thirdLogin', 'POST', requestData)
    .then(({ response }) => {
      const resetResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg, userInfo } = JSON.parse(resetResult)
      if (respCode === '01') {
        success && success(userInfo)
      } else if (respCode === '1002') {
        compensate && compensate()
      } else {
        fail && fail(errorMsg)
      }
    })
}

function bingdingUser (requestData) {
  ajax
    .getXhrPromise('bingdingUser', 'POST', requestData)
    .then(({ response }) => {
      const resetResult = Decrypt(response, ENCRYPTKEY)
      const { respCode } = JSON.parse(resetResult)
      if (respCode === '01') {
      } else {
      }
    })
}

function getUserAccountInfo (requestData, success, error) {
  ajax.getXhrPromise(
    'getUserAccountInfo',
    'POST',
    requestData
  )
    .then(({ response }) => {
      const loginResult = Decrypt(response, ENCRYPTKEY)
      const { respCode, errorMsg, userInfo } = JSON.parse(loginResult)
      if (respCode === '01') {
        success && success(userInfo)
      } else {
        error && error({errorMsg, respCode})
      }
    })
}

export default {
  getUserRequestData,
  getLoginRequestData,
  getAccountType,
  getAccessTocken,
  getUserInfo,
  getValidateCode,
  checkValidateCode,
  userRegist,
  userLogin,
  accessTokenLogin,
  updateUserPsw,
  starReplaceStr,
  starReplaceMob,
  afterRegisterSuccessHanlde,
  afterLoginSuccessHanlde,
  getShareState,
  shareState,
  getWechatAccessToken,
  thirdLogin,
  getWechatUserInfo,
  bingdingUser,
  getUserAccountInfo,
  collectUserAction
}
