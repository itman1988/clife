import { Encrypt } from './encrypt_decrypt'
import $ from 'jquery'
import Config from '../constants/config.es6'
import { getUrlKey } from './getRouterQuery'

// 生产
// const SITE_PREFIXER = 'https://www.chinalife.com.cn/userService/webService'
// 测试
const SITE_PREFIXER = 'http://10.28.37.85:2222/userService/webService'

// 测试1 tst1.chinalife.com.cn
// const SITE_PREFIXER = 'http://tst1.chinalife.com.cn/userService/webService'

const BASE_REQUEST = {
  clientAuth: 'admin',
  clientPsw: 'admin',
  clientSender: getUrlKey('clientSender'),
  serviceVersion: 'V1.0.0',
  serviceUrl: null,
  requestType: null,
  webFlag: 1,
  reqBizInfo: null
}
const TIMEOUT = 30000

function getXhrPromise (uri, method, data) {
  const requestData = Object.assign(
    {},
    BASE_REQUEST,
    {
      serviceUrl: uri,
      requestType: uri,
      reqBizInfo: Encrypt(
        JSON.stringify(data),
        Config.ENCRYPTKEY
      )
    }
  )
  /* eslint-disable */
  const configuration = {
    url: `${SITE_PREFIXER}`,
    type: method,
    dataType: 'json',
    contentType: 'text/html;charset=utf-8',
    data: JSON.stringify(requestData),
    timeout: TIMEOUT,
    crossDomain: true == !(document.all), // 解决ie9不请求的问题！！！
    cache: false
  }
  return new Promise((resolve, reject) => {
    $.ajax(configuration)
      .done(data => resolve(data))
      .fail(res => reject(res))
  })
}

export default {
  getXhrPromise
}
