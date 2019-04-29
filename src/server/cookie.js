const expiressTime = 30 * 60 * 1000

function setCookieUnit (obj, expiress) {
  const name = Object.keys(obj)[0]
  const value = escape(obj[name])
  const expiressTimeStamp = expiress || (new Date().getTime() + expiressTime)
  document.cookie = `${name}=${value};expiress=${expiressTimeStamp}`
}

function getCookieMap () {
  // cookie.setSecure(true)
  const cookieMap = new Map()
  const cookies = document.cookie
  const cookiesArr = cookies.split(';')
  for (let item of cookiesArr) {
    if (item) {
      const keyValue = item.split('=')
      const name = keyValue[0].trim()
      const value = keyValue[1].trim()
      cookieMap.set(name, value)
    }
  }
  return cookieMap
}

function setCookie (params) {
  // cookie.setSecure(true)
  if (typeof params === 'object') {
    if (Object.prototype.toString.call(params) === '[object Array]') {
      for (let item of params) {
        setCookieUnit(item)
      }
    } else if (Object.prototype.toString.call(params) === '[object Object]') {
      setCookieUnit(params)
    }
  } else {
    // console.log('参数应该为对象或对象数组')
  }
}

function getCookie (name) {
  const cookieMap = getCookieMap()
  return unescape(cookieMap.get(name))
}

function deleteCookie (name) {
  const cookieMap = getCookieMap()
  const time = new Date().getTime() - 10000
  setCookieUnit({
    [name]: unescape(cookieMap.get(name))
  }, time)
}

const Cookie = {
  setCookie,
  getCookie,
  deleteCookie
}
export default Cookie
