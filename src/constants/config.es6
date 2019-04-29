 var Config = {
  CAPTCHCOUNTDOWN: 120,
  ENCRYPTKEY: '72c63bbe074333b2f64bfe781436833d',
  APPID: 'wx40b97a8305bee059',
  APPSECRET: '9ec1ad9ca10ae52da17a8d500e2e5fce',
}

export  var AccountType = {
  mobileNo: Symbol('mobileNo'),
  emailAddress: Symbol('emailAddress'),
  userCode: Symbol('userCode'),
  certiNo: Symbol('certiNo'),
}

export  var customerSort = {
  personnel: '个人客户',
  enterprise: '企业客户',
  salesman: '业务员',
}

export  var headerTitleMap = {
  login: "用户登录",
  register: "个人客户注册",
  reset: "找回密码"
};

export default Config;
