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

export const getMovieDetail = (movie_id) => {
  return tmdbClient.get(`/movie/${movie_id}`)
}

export const getTempToken = () => {
  return tmdbClient.get(`/authentication/token/new`)
}

export const userLogin = (userInfo) => {
  return tmdbClient.get('/authentication/token/validate_with_login', {
    params: userInfo 
  })
}

export const userLogout = (id) => {
  return tmdbClient.delete('/authentication/session', {
    params: {session_id: id} 
  })
}

export const getUserLongSession = (token) => {
  return tmdbClient.get('/authentication/session/new', {
    params: {request_token: token} 
  })
}