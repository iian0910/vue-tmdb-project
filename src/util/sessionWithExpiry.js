export const sessionWithExpiry = {
  setItem(key, value, ttlMillis = 15 * 60 * 1000) {
    const now = Date.now()
    const item = {
      data: value,
      expiry: now + ttlMillis
    }

    sessionStorage.setItem(key, JSON.stringify(item))

    setTimeout(() => {
      sessionStorage.removeItem(key)
    }, ttlMillis)
  },

  getItem(key) {
    const itemStr = sessionStorage.getItem(key)
    if(!itemStr) return null

    try {
      const item = JSON.parse(itemStr)
      const now = Date.now()

      // 判斷有沒過期
      if (now > item.expiry) {
        sessionStorage.removeItem(key)
        return null
      }

      return item.data
    } catch (error) {
      return itemStr
    }
  }
}