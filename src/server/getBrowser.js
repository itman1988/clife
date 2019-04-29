// IE
export function IETester (userAgent) {
  let UA = userAgent || navigator.userAgent
  if (/msie/i.test(UA)) {
    return UA.match(/msie (\d+\.\d+)/i)[1]
  } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
    return 'IE ' + UA.match(/rv:(\d+\.\d+)/)[1]
  }
  return getBrowserInfo()
}

// 非IE
export function getBrowserInfo () {
  let agent = navigator.userAgent.toLowerCase()
  let regStrIe = /msie [\d.]+;/gi
  let regStrFf = /firefox\/[\d.]+/gi
  let regStrChrome = /chrome\/[\d.]+/gi
  let regStrSaf = /safari\/[\d.]+/gi
  // IE
  if (agent.indexOf('msie') > 0) {
    return agent.match(regStrIe)
  }

  // firefox
  if (agent.indexOf('firefox') > 0) {
    return agent.match(regStrFf)
  }

  // Chrome
  if (agent.indexOf('chrome') > 0) {
    return agent.match(regStrChrome)
  }

  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    return agent.match(regStrSaf)
  }
}
