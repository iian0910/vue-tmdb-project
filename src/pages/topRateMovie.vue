<script setup>
import { onMounted, ref, watch } from 'vue'
import { getTopRateMovie } from '@/api/tmdb.js'
import { useRouter } from 'vue-router'

import BackPage from '../components/BackPage.vue'
import PageLoading from '@/components/PageLoading.vue'

const router = useRouter()

// data
const movieList = ref([])
const listTotalPage = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)

// watch
watch(currentPage, (newPage) => {
  getMovieList(newPage)
})

// methods
const getMovieList = async(page = 1) => {
  isLoading.value = true
  try {
    const { data } = await getTopRateMovie(page)
    movieList.value = data.results
    listTotalPage.value = data.total_pages
    currentPage.value = data.page
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
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
  <PageLoading
    v-if="isLoading"
    :is-loading="isLoading"
  />
  <v-container v-else>
    <BackPage/>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        lg="3"
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