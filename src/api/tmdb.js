import axios from "axios"

const tmdbClient = axios.create({
  baseURL: '/api/tmdb',
  params: {
    language: 'zh-TW'
  }
})

export const getPopularMovies = (page = 1) => {
  return tmdbClient.get('/movie/popular', {
    params: { page }
  })
}

export const getNowPlayingMovies = (page = 1) => {
  return tmdbClient.get('/movie/now_playing', {
    params: { page }
  })
}