// 生成随机字符串

const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function getRandomString(n) {
  let res = ''
  for (let i = 0; i < n; i++) {
    let index = Math.ceil(Math.random() * 35)
    res += chars[index]
  }
  return res
}

export {
  getRandomString
}