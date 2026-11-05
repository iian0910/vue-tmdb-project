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
  return tmdbClient.post('/authentication/token/validate_with_login', userInfo)
}

export const userLogout = (session_id) => {
  return tmdbClient.delete('/authentication/session', {
    params: { session_id } 
  })
}

export const getUserLongSession = (request_token) => {
  return tmdbClient.post('/authentication/session/new', { request_token })
}

export const getUserInfo = (session_id) => {
  return tmdbClient.get('/account', {
    params: { session_id } 
  })
}

export const changeFavoriteStatus = (session_id, account_id, item) => {
  return tmdbClient.post(`/account/${account_id}/favorite`, item, {
    params: { session_id } 
  })
}

export const getMovieStates = (session_id, movie_id) => {
  return tmdbClient.get(`/movie/${movie_id}/account_states`, {
    params: { session_id } 
  })
}

export const getMovieImgList = (session_id, movie_id) => {
  return tmdbClient.get(`/movie/${movie_id}/images`, {
    params: { session_id } 
  })
}

export const getMovieVideo = (session_id, movie_id) => {
  return tmdbClient.get(`/movie/${movie_id}/videos`, {
    params: { session_id } 
  })
}