const RegExpStr = {
  mobileNo: '^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0123456789]|18[0-9]|14[57]|19[89])[0-9]{8}$',
  emailAddress: '^[0-9a-zA-Z_][-_.0-9a-zA-Z-]{0,63}@([0-9a-zA-Z][0-9a-zA-Z-]*.)+[a-zA-Z]{2,4}$',
  password: {
    lower: '^([a-z]{1,5}|[A-Z]{1,5}|[0-9]{1,5})$',
    middle: '^((?=.*\\d)(?=.*[a-z])[a-z0-9]{6,16}|(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{6,16}|(?=.*\\d)(?=.*[A-Z])[A-Z0-9]{6,16}|(?=.*\\d)(?=.*_)[_0-9]{6,16}|(?=.*_)(?=.*[a-z])[a-z_]{6,16}|(?=.*_)(?=.*[A-Z])[A-Z_]{6,16})$',
    higher: '^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{6,16})|((?=.*_)(?=.*[a-z])(?=.*[A-Z])[A-Za-z_]{6,16})|((?=.*\\d)(?=.*_)(?=.*[A-Z])[A-Z0-9_]{6,16})|((?=.*\\d)(?=.*[a-z])(?=.*_)[a-z0-9_]{6,16})|((?=.*\\d)(?=.*_)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9_]{6,16})$'
  },
  certiNo: '^(([1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X))|([1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}))$'
}

const rules = {
  telephone: {
    regx: RegExpStr.mobileNo,
    type: 'number',
    validTip: {
      0: '手机号格式不正确，请重新输入。',
      1: '成功'
    }
  },
  email: {
    regx: RegExpStr.emailAddress,
    type: 'string',
    validTip: {
      0: '该内容不符合规则',
      1: '成功'
    }
  },
  captch: {
    regx: '.+',
    type: 'string',
    validTip: {
      0: '该内容不符合规则',
      1: '成功'
    }
  },
  password: {
    // regx: RegExpStr.password.middle + '\|' + RegExpStr.password.higher,
    regx: RegExpStr.password.middle + '|' + RegExpStr.password.higher,
    type: 'string',
    validTip: {
      0: '该内容不符合规则',
      1: '成功'
    }
  }
}

function _each (arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i])
    break
  }
}

function _likeNumber (value) {
  if (isNaN(value * 1)) {
    return false
  } else {
    return true
  }
}

function throughValid (arr) {
  var result = true
  _each(arr, item => {
    if (arr[item] !== 1) {
      result = false
    }
  })
  return result
};

function validateValue (name, value) {
  const { type, regx, validTip } = rules[name]
  const trimValue = value.trim()
  const reg = new RegExp(regx)

  let validCode = 0

  if (type === 'number' && _likeNumber(value)) {
    const intValue = parseInt(trimValue, 10)
    validCode = reg.test(intValue) ? 1 : 0
  } else if (type === 'string') {
    const strValue = '' + trimValue
    validCode = reg.test(strValue) ? 1 : 0
  } else {
    validCode = 0
  }

  return {
    code: validCode,
    message: validTip[validCode]
  }
};

export default {
  throughValid,
  validateValue,
  RegExpStr
}
