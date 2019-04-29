export function formatDate (val) {
  if (val !== '' && !Number.isNaN(Number(val))) {
    // 格式化时间
    let start = new Date(val)
    let y = start.getFullYear()
    let m = (start.getMonth() + 1) > 9 ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1)
    let d = start.getDate() > 9 ? start.getDate() : '0' + start.getDate()
    return m + '/' + d + '/' + y
  }
  return val
}
