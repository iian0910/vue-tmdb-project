<script setup>

import { getNowPlayingMovies } from '@/api/tmdb'
import { onMounted, ref } from 'vue';

// data
const nowList = ref([])

// computed

// methods
const nowPlayingMovies = async() => {
  try {
    const { data } = await getNowPlayingMovies()
    nowList.value = data.results.slice(0, 10)
  } catch (error) {
    console.log(error)
  }
}

// mounted
onMounted(() => {
  nowPlayingMovies()
})
</script>

<template>
  <v-carousel
    v-if="nowList.length > 0"
    hide-delimiters
    :show-arrows="false"
    height="600"
    show-arrows="hover"
    cycle
    hide-delimiter-background
    crossfade
  >
    <v-carousel-item
      v-for="(movie, i) in nowList"
      :key="i"
      :src="`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`"
      cover
    >
      <div class="carousel-gradient-overlay d-flex align-center">
        <!-- 放置文字或按鈕區域 -->
        <div class="movie-info text-white px-8">
          <h2 class="text-h4 font-weight-bold mb-3">{{movie.title}}</h2>
          <p class="text-body-1 overview-text">{{movie.overview}}</p>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss" scoped>
.carousel-gradient-overlay {
  width: 100%;
  height: 100%;
  /* 
    從左向右的漸層：
    左側 0% 為 90% 不透明黑色，延展到 45% 仍保持較深色以襯托文字，
    最後在 100% 完全漸變至透明
  */
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 45%,
    rgba(0, 0, 0, 0) 100%
  );
}

.movie-info {
  max-width: 550px;
}

.overview-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}
</style>