<script setup>
import { onMounted, ref, watch } from 'vue'
import { getPopularMovies } from '@/api/tmdb.js'
import BackPage from '../components/BackPage.vue'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
const router = useRouter()

// data
const movieList = ref([])
const listTotalPage = ref(0)
const currentPage = ref(1)

// watch
watch(currentPage, (newPage) => {
  getMovieList(newPage)
})

// methods
const getMovieList = async(page = 1) => {
  await loadingStore.withLoading(async() => {
    const { data } = await getPopularMovies(page)
    movieList.value = data.results
    listTotalPage.value = data.total_pages
    currentPage.value = data.page
  })
}

const goToDetail = (id) => {
  router.push({
    name: 'MovieDetailInfo',
    params: { id }
  })
}

// mounted
onMounted(() => {
  getMovieList()
})
</script>

<template>
  <v-container>
    <BackPage v-if="!isLoading"/>
    <v-row>
      <v-col
        cols="12"
        md="4"
        lg="2"
        v-for="movie in movieList"
        :key="movie.id"
      >
        <v-card
          class="poster-container ma-3"
          color="grey-lighten-4"
          elevation="2"
          rounded="xl"
          @click="goToDetail(movie.id)"
        >
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="poster-img"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="listTotalPage"
      :total-visible="7"
    />
  </v-container>
</template>

<style lang="scss" scoped>
.poster-container {
  /* 設定標準海報比例 2:3 */
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: transparent;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>