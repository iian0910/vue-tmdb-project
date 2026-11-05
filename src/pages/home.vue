<script setup>
import { onMounted, ref } from 'vue'
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUserInfo
} from '@/api/tmdb'
import { useAuthStore } from '@/stores/auth'

import MovieCarousel from '../components/MovieCarousel.vue'
import MovieSlide from '@/components/MovieSlide.vue'
import PageLoading from '@/components/PageLoading.vue'

const authStore = useAuthStore()

// data
const nowList = ref([])
const movieList = ref([])
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
  try {
    const [nowMovieList, popularMovieList] = await Promise.all([
      getNowPlayingMovies(),
      getPopularMovies()
    ])

    nowList.value = nowMovieList.data.results.slice(0, 10)
    movieList.value = popularMovieList.data.results.slice(0, 10)
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
      :move-list="nowList"
    />
    <v-container>
      <MovieSlide
        title="熱門電影"
        :movie-list="movieList"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
</style>