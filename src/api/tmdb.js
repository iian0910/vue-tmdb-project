import axios from "axios"
import { TMDB_ERROR_MESSAGES, HTTP_STATUS_MESSAGES } from "@/util/tmdbStatus"
import { useAlert } from '@/composables/useAlert'

const { showAlert } = useAlert()

const tmdbClient = axios.create({
  baseURL: '/api/tmdb',
  params: {
    language: 'zh-TW'
  }
})

// GET
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

export const getUserInfo = (session_id) => {
  return tmdbClient.get('/account', {
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

export const getFavoriteMovieList = (session_id, account_id) => {
  return tmdbClient.get(`/account/${account_id}/favorite/movies`, {
    params: { session_id } 
  })
}

// POST
export const userLogin = (userInfo) => {
  return tmdbClient.post('/authentication/token/validate_with_login', userInfo)
}

export const getUserLongSession = (request_token) => {
  return tmdbClient.post('/authentication/session/new', { request_token })
}

export const changeFavoriteStatus = (session_id, account_id, item) => {
  return tmdbClient.post(`/account/${account_id}/favorite`, item, {
    params: { session_id } 
  })
}

// DELETE
export const userLogout = (session_id) => {
  return tmdbClient.delete('/authentication/session', {
    params: { session_id } 
  })
}

tmdbClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const httpStatus = error.response.status
      const responseData = error.response.data || {}

      const tmdbCode = responseData.status_code
      const serverMessage = responseData.status_message

      const friendlyMessage = TMDB_ERROR_MESSAGES[tmdbCode] || HTTP_STATUS_MESSAGES[httpStatus] || serverMessage || '發生未知錯誤，請稍後再試'

      error.friendlyMessage = friendlyMessage
      error.tmdbCode = tmdbCode

      console.error(`[TMDB API Error] HTTP ${httpStatus} | 代碼 ${tmdbCode}: ${friendlyMessage}`, 'error')

      // 登入失敗或Token過期
      const authExpiredCodes = [3, 14, 17, 33]
      if (httpStatus === 401 || authExpiredCodes.includes(tmdbCode)) {
        sessionStorage.removeItem('session_id')
        sessionStorage.removeItem('account_id')
      }
    } else if (error.request) {
      error.friendlyMessage = '網路連線異常'
    } else {
      error.friendlyMessage = error.message || '發送請求時發生錯誤'
    }

    showAlert(error.friendlyMessage, 'error')
    return Promise.reject(error)
  }
)