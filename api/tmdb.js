export default async function handler(req, res) {
  try {
    // 取得去除 /api/tmdb 之後的路徑與 query 參數
    const subPath = req.url ? req.url.replace(/^\/api\/tmdb/, '') : ''
    const targetUrl = `https://api.themoviedb.org/3${subPath}`

    // const response = await fetch(targetUrl, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    //     Accept: 'application/json'
    //   }
    // })
    // 1. 設定 Method 與 Headers
    const fetchOptions = {
      method: req.method, // 繼承前端的 POST
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }

    // 2. 關鍵：如果不是 GET/HEAD，一定要把前端的 Body 轉發給 TMDB
    if (['POST', 'PUT', 'DELETE'].includes(req.method) && req.body) {
      // Vercel 會自動解析 req.body 為物件，轉發給 fetch 時必須轉成 JSON 字串
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    }

    const response = await fetch(targetUrl, fetchOptions)

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message || 'Serverless Proxy Error' })
  }
}