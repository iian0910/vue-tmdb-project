export default async function handler(req, res) {
  try {
    // 取得去除 /api/tmdb 之後的路徑與 query 參數
    const subPath = req.url ? req.url.replace(/^\/api\/tmdb/, '') : ''
    const targetUrl = `https://api.themoviedb.org/3${subPath}`

    const response = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        Accept: 'application/json'
      }
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message || 'Serverless Proxy Error' })
  }
}