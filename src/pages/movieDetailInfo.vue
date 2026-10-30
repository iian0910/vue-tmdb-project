<script setup>
import { getMovieDetail } from '@/api/tmdb'
import { onMounted, ref } from 'vue'
import BackPage from '../components/BackPage.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// data
const detail = ref({})

// methods
const getDetail = async(id) => {
  try {
    const { data } = await getMovieDetail(id)
    detail.value = data
    console.log(detail.value)
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
    <BackPage />
    <v-row>
      <v-col cols="12" lg="4">
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
        <img width="100%" :src="`https://image.tmdb.org/t/p/w500${detail.poster_path}`" :alt="detail.title">
      </v-col>
      <v-col cols="12" lg="4">
        <p class="text-label-large">名稱：</p>
        <p class="text-title-medium">{{detail.title}}</p>
        <p class="text-label-large">概要：</p>
        <p class="text-body-medium">{{detail.overview}}</p>
        <p class="text-label-large">產地：</p>
        <p class="text-body-medium">{{detail.production_countries[0].name}}</p>
        <p class="text-label-large">語系：</p>
        <p class="text-body-medium">{{detail.original_language}}</p>
        <p class="text-label-large">上映日期：</p>
        <p class="text-body-medium">{{detail.release_date}}</p>
      </v-col>
      <v-col cols="12" lg="4">
        <p class="text-label-large">影評得分</p>
        <p class="text-headline-large">{{detail.vote_average}}</p>
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