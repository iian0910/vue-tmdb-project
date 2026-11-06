<script setup>
import { onMounted, ref } from 'vue'
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUserInfo,
  getFavoriteMovieList
} from '@/api/tmdb'
import { useAuthStore } from '@/stores/auth'

import MovieCarousel from '../components/MovieCarousel.vue'
import MovieSlide from '@/components/MovieSlide.vue'
import PageLoading from '@/components/PageLoading.vue'

const authStore = useAuthStore()

// data
const nowList = ref([])
const movieList = ref([])
const favoriteList = ref([])
const isLoading = ref(false)

// methods
const getInfo = async() => {
  const sessionID = sessionStorage.getItem('session_id')
  try {
    const { data } = await getUserInfo(sessionID)
    authStore.setAccountID(data.id)
  } catch (error) {
    console.log(error)
  }
}

const fetchPageData = async() => {
  isLoading.value = true
  const sessionID = sessionStorage.getItem('session_id')
  const accountID = sessionStorage.getItem('account_id')
  try {
    const [nowMovieList, popularMovieList, favoriteMovieList] = await Promise.all([
      getNowPlayingMovies(),
      getPopularMovies(),
      getFavoriteMovieList(sessionID, accountID)
    ])

    nowList.value = nowMovieList.data.results
    movieList.value = popularMovieList.data.results
    favoriteList.value = favoriteMovieList.data.results
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

// mounted
onMounted(() => {
  getInfo()
  fetchPageData()
})
</script>

<template>
  <PageLoading
    v-if="isLoading"
    :is-loading="isLoading"
  />
  <div v-else>
    <MovieCarousel
      :move-list="nowList.slice(0, 10)"
    />
    <v-container>
      <MovieSlide
        v-if="movieList.length"
        title="熱門電影"
        :movie-list="movieList.slice(0, 10)"
        :show-more="movieList.length >= 10"
      />
      <MovieSlide
        v-if="favoriteList.length"
        title="我的最愛"
        :movie-list="favoriteList.slice(0, 10)"
        :show-more="favoriteList.length >= 10"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
</style>