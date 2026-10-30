<script setup>
import { onMounted, ref } from 'vue'
import { getPopularMovies } from '@/api/tmdb.js'
import { useWindowSize } from '@/composables/useDeviceSize'

const { isMobile } = useWindowSize()

// props
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

// data
const movieList = ref([])
const selectedCard = ref(null)

// methods
const getMovieList = async() => {
  try {
    const { data } = await getPopularMovies()
    movieList.value = data.results.slice(0, 10)
  } catch (error) {
    console.log(error)
  }
}

// mounted
onMounted(() => {
  getMovieList()
})
</script>

<template>
  <div>
    <h1 class="pl-10 mb-0">{{ title }}</h1>
    <v-slide-group
      v-model="selectedCard"
      class="pa-4"
      selected-class="bg-primary"
      :show-arrows="!isMobile"
    >
      <v-slide-group-item
        v-for="movie in movieList"
        :key="movie.id"
      >
        <v-card
          class="poster-container ma-3"
          color="grey-lighten-4"
          width="260"
          elevation="2"
          rounded="xl"
        >
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="poster-img"
          />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<style lang="scss" scoped>
.poster-container {
  /* 設定標準海報比例 2:3 */
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: #2d3748; /* 圖片載入前的占位底色 */
}

.poster-img {
  width: 100%;
  height: 100%;
  /* 關鍵：等比縮放填滿容器，超出部分自動裁切，不會被拉伸扁平 */
  object-fit: cover;
  display: block;
}
</style>