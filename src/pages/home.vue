<script setup>
import { onMounted, ref } from 'vue'
import { getNowPlayingMovies } from '@/api/tmdb'
import { getPopularMovies } from '@/api/tmdb.js'

import MovieCarousel from '../components/MovieCarousel.vue'
import MovieSlide from '@/components/MovieSlide.vue'

import { useLoadingStore } from '@/stores/loading'
const loadingStore = useLoadingStore()

// data
const nowList = ref([])
const movieList = ref([])

// methods
const nowPlayingMovies = async() => {
  await loadingStore.withLoading(async() => {
    const { data } = await getNowPlayingMovies()
    nowList.value = data.results.slice(0, 10)
  })
}
const getMovieList = async() => {
  await loadingStore.withLoading(async() => {
    const { data } = await getPopularMovies()
    movieList.value = data.results.slice(0, 10)
  })
}

// mounted
onMounted(() => {
  nowPlayingMovies()
  getMovieList()
})
</script>

<template>
  <MovieCarousel
    :move-list="nowList"
  />
  <v-container>
    <MovieSlide
      title="熱門電影"
      :movie-list="movieList"
    />
  </v-container>
</template>

<style lang="scss" scoped>
</style>