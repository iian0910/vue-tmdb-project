<script setup>

import { getNowPlayingMovies } from '@/api/tmdb'
import { onMounted, ref } from 'vue'
import { useWindowSize } from '@/composables/useDeviceSize'

const { isMobile } = useWindowSize()

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
  <div class="pa-4">
    <v-carousel
      class="rounded-xl"
      v-if="nowList.length > 0"
      hide-delimiters
      :show-arrows="false"
      :height="isMobile ? '600' : '800'"
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
        <div class="carousel-gradient-overlay d-flex align-end">
          <!-- 放置文字或按鈕區域 -->
          <div class="movie-info text-white px-10 mb-10">
            <h3 class="text-headline-small text-md-headline-large font-weight-bold mb-3">{{movie.title}}</h3>
            <p class="text-body-medium text-md-body-large overview-text">{{movie.overview || '目前無電影描述'}}</p>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<style lang="scss" scoped>
.carousel-gradient-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 45%,
    rgba(0, 0, 0, 0) 100%
  );

  @media (max-width: 500px) {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.6) 20%,
      rgba(0, 0, 0, 0) 100%
    );
  }
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