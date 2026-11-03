<script setup>
import { getMovieDetail } from '@/api/tmdb'
import { computed, onMounted, ref } from 'vue'
import BackPage from '../components/BackPage.vue'
import { useRoute } from 'vue-router'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
const route = useRoute()

// data
const detail = ref({})

// computed
const progressBarLevel = computed(() => (detail.value?.vote_average || 0) * 10)

// methods
const getDetail = async(id) => {
  await loadingStore.withLoading(async() => {
    const { data } = await getMovieDetail(id)
    detail.value = data
  })
}

// mounted
onMounted(() => {
  getDetail(route.params.id)
})

</script>

<template>
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
  </v-container>
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