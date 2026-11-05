<script setup>
import {
  getMovieDetail,
  changeFavoriteStatus,
  getMovieStates,
  getMovieImgList
} from '@/api/tmdb'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import BackPage from '../components/BackPage.vue'
import PageLoading from '@/components/PageLoading.vue'

const route = useRoute()

// data
const detail = ref({})
const isLoading = ref(false)
const isFavoriteMovie = ref(false)
const imageList = ref([])

// computed
const progressBarLevel = computed(() => (detail.value?.vote_average || 0) * 10)

// methods
const getDetail = async(id) => {
  isLoading.value = true
  try {
    const { data } = await getMovieDetail(id)
    detail.value = data
    
    updateMovieDetail(detail.value.id)
    await getMovieImage(detail.value.id)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const favoriteStatus = async(id) => {
  const accountID = sessionStorage.getItem('account_id')
  const sessionID = sessionStorage.getItem('session_id')
  const obj = {
    media_type: 'movie',
    media_id: id,
    favorite: !isFavoriteMovie.value
  }
  try {
    await changeFavoriteStatus(sessionID, accountID, obj)
    updateMovieDetail(id)
  } catch (error) {
    console.log(error)
  }
}

const updateMovieDetail = async(id) => {
  const sessionID = sessionStorage.getItem('session_id')
  try {
    const { data } = await getMovieStates(sessionID, id)
    isFavoriteMovie.value = data.favorite
  } catch (error) {
    console.log(error)
  }
}

const getMovieImage = async(id) => {
  const sessionID = sessionStorage.getItem('session_id')
  try {
    const { data } = await getMovieImgList(sessionID, id)
    imageList.value = data.posters
  } catch (error) {
    console.log(error)
  }
}

// mounted
onMounted(() => {
  getDetail(route.params.id)
})

</script>

<template>
  <PageLoading
    v-if="isLoading"
    :is-loading="isLoading"
  />
  <div v-else>
    <v-card
      :image="`https://image.tmdb.org/t/p/original${detail.backdrop_path}`"
      height="450"
      theme="dark"
      class="d-flex align-end"
    >
      <v-container>
        <v-card-text class="pa-0">
          <div class="movie-info text-white mb-5">
            <h3 class="text-headline-small text-md-headline-large font-weight-bold mb-3">{{detail.title}}</h3>
            <p class="text-body-medium text-md-body-large overview-text">{{detail.overview || '目前無電影描述'}}</p>
          </div>
        </v-card-text>
      </v-container>
    </v-card>
    <v-container>
      <BackPage v-if="!isLoading"/>
      <v-row>
        <v-col cols="12" lg="4">
          <img width="100%" :src="`https://image.tmdb.org/t/p/w500${detail.poster_path}`" :alt="detail.title">
          <v-btn
            :variant="isFavoriteMovie ? 'elevated' : 'outlined'"
            :prepend-icon="isFavoriteMovie ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
            color="pink-lighten-3"
            class="rounded mt-5"
            @click="favoriteStatus(detail.id)"
          >
            {{isFavoriteMovie ? '已' : ''}}加入我的最愛
          </v-btn>
        </v-col>
        <v-col cols="12" lg="5">
          <p class="text-label-large">名稱：</p>
          <p class="text-title-medium">{{detail.title}}</p>
          <p class="text-label-large">概要：</p>
          <p class="text-body-medium">{{detail.overview}}</p>
          <p class="text-label-large">語系：</p>
          <p class="text-body-medium">{{detail.original_language}}</p>
          <p class="text-label-large">上映日期：</p>
          <p class="text-body-medium">{{detail.release_date}}</p>
          <p class="text-label-large">分類標籤：</p>
          <div>
            <v-chip
              class="mx-1 mb-3"
              color="primary"
              variant="flat"
              v-for="chip in detail.genres"
              :key="chip.id"
            >
              {{chip.name}}
            </v-chip>
          </div>
        </v-col>
        <v-col cols="12" lg="3">
          <p class="text-label-large">影評得分</p>
          <v-progress-circular
            :model-value="progressBarLevel"
            :size="200"
            :width="15"
            bg-color="surface-light"
            class="ma-3"
            color="orange-accent-2"
            reveal
            rounded
          >
            <v-avatar color="surface-light" size="150" class="text-display-medium">{{ detail?.vote_average?.toFixed(2) || '0.00' }}</v-avatar>
          </v-progress-circular>
        </v-col>
      </v-row>
      <v-row
        class="mt-10"
        v-if="imageList.length"
      >
        <v-col
          v-for="(img, idx) in imageList"
          :key="idx"
          cols="12"
          lg="4"
        >
          <img width="100%" :src="`https://image.tmdb.org/t/p/w500${img.file_path}`" alt="">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
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