<script setup>
import {
  getMovieDetail,
  changeFavoriteStatus,
  getMovieStates,
  getMovieImgList,
  getMovieVideo,
  getMovieReviewsList
} from '@/api/tmdb'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowSize } from '@/composables/useDeviceSize'

import BackPage from '../components/BackPage.vue'
import PageLoading from '@/components/PageLoading.vue'

const route = useRoute()
const { isMobile } = useWindowSize()

// data
const detail = ref({})
const isLoading = ref(false)
const isFavoriteMovie = ref(false)
const imageList = ref([])
const videoList = ref([])
const isBtnLoading = ref(false)
const isShowMovie = ref(false)
const movieReviewList = ref([])

// computed
const progressBarLevel = computed(() => (detail.value?.vote_average || 0) * 10)

// methods
const getDetail = async(id) => {
  isLoading.value = true
  const sessionID = sessionStorage.getItem('session_id')
  try {
    const { data } = await getMovieDetail(id)
    detail.value = data
    
    updateMovieDetail(detail.value.id)

    const [imgRes, videoRes, reviewsRes] = await Promise.all([
      getMovieImgList(sessionID, detail.value.id),
      getMovieVideo(sessionID, detail.value.id),
      getMovieReviewsList(sessionID, detail.value.id)
    ])

    imageList.value = imgRes.data.posters
    videoList.value = videoRes.data.results
    movieReviewList.value = reviewsRes.data.results.slice(0, 6)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const favoriteStatus = async(id) => {
  isBtnLoading.value = true
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
  } finally {
    isBtnLoading.value = false
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
      height="600"
      theme="dark"
    >
      <div class="bg-mask"></div>
    </v-card>
    <v-container class="detail-info">
        <BackPage v-if="!isLoading"/>
        <v-row>
          <v-col cols="12" lg="4" v-if="!isMobile">
            <img width="100%" :src="`https://image.tmdb.org/t/p/w500${detail.poster_path}`" :alt="detail.title">
            <div class="d-flex">
              <v-btn
                :variant="isFavoriteMovie ? 'elevated' : 'outlined'"
                :prepend-icon="isFavoriteMovie ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
                color="pink-lighten-3"
                class="rounded mt-5"
                @click="favoriteStatus(detail.id)"
                :loading="isBtnLoading"
              >
                {{isFavoriteMovie ? '已' : ''}}加入我的最愛
              </v-btn>
              <v-btn
                v-if="videoList[0]?.key"
                variant="outlined"
                prepend-icon="mdi mdi-movie-open-play"
                color="secondary"
                class="rounded mt-5 ml-5"
                @click="isShowMovie = true"
              >
                電影預告片
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" lg="5">
            <p class="text-title-large">名稱：{{detail.title}}</p>
            <p class="text-title-large">概要：</p>
            <p class="text-body-large">{{detail.overview}}</p>
            <p class="text-title-large">語系：{{detail.original_language}}</p>
            <p class="text-title-large">上映日期：{{detail.release_date}}</p>
            <p class="text-title-large">分類標籤：</p>
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
          <v-col cols="12" v-if="isMobile">
            <div class="d-flex">
              <v-btn
                :variant="isFavoriteMovie ? 'elevated' : 'outlined'"
                :prepend-icon="isFavoriteMovie ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
                color="pink-lighten-3"
                class="rounded mt-5"
                @click="favoriteStatus(detail.id)"
                :loading="isBtnLoading"
              >
                {{isFavoriteMovie ? '已' : ''}}加入我的最愛
              </v-btn>
              <v-btn
                v-if="videoList[0]?.key"
                variant="outlined"
                prepend-icon="mdi mdi-movie-open-play"
                color="secondary"
                class="rounded mt-5 ml-5"
                @click="isShowMovie = true"
              >
                電影預告片
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" lg="3">
            <p class="text-title-large">影評得分</p>
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
          v-if="movieReviewList.length"
        >
          <v-col cols="12">
            <p class="text-title-large my-0">評論區</p>
          </v-col>
          <v-col
            v-for="(review, idx) in movieReviewList"
            :key="idx"
            cols="12"
            lg="6"
          >
            <v-card
              border="surface md"
              class="
                mx-auto
                h-100
                d-flex
                flex-column
                bg-background
              "
              elevation="4"
              
            >
              <v-card-item>
                <v-card-title>
                  {{review.author}}
                </v-card-title>
  
                <v-card-subtitle>
                  {{ review.updated_at }}
                </v-card-subtitle>
              </v-card-item>
  
              <v-card-text>
                <div class="multi-line-ellipsis">
                  {{ review.content }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          class="mt-10"
          v-if="imageList.length"
        >
          <v-col cols="12">
            <p class="text-title-large my-0">電影海報</p>
          </v-col>
          <v-col
            v-for="(img, idx) in imageList"
            :key="idx"
            cols="12"
            lg="2"
          >
            <img width="100%" :src="`https://image.tmdb.org/t/p/w500${img.file_path}`" alt="">
          </v-col>
        </v-row>
    </v-container>

    <v-dialog
      v-model="isShowMovie"
      width="90%"
      max-width="800px"
    >
      <v-card color="black" rounded="lg" class="position-relative overflow-hidden">
        <!-- 右上角懸浮關閉按鈕，避免額外的標題列/按鈕列破壞 16:9 比例 -->
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          size="small"
          class="position-absolute"
          style="top: 8px; right: 8px; z-index: 10;"
          @click="isShowMovie = false"
        />

        <!-- Vuetify 原生等比容器 -->
        <v-responsive :aspect-ratio="16 / 9">
          <iframe
            class="w-100 h-100"
            :src="`https://www.youtube.com/embed/${videoList[0]?.key}`"
            title="Movie Trailer"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </v-responsive>
      </v-card>
    </v-dialog>
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

.multi-line-ellipsis {
  width: 100%;             /* 必須設定寬度（或 max-width） */
  display: -webkit-box;     /* 必須結合的屬性，將物件作為彈性伸縮盒模型顯示 */
  -webkit-line-clamp: 3;    /* 限制顯示的行數（例如：最多顯示 3 行） */
  -webkit-box-orient: vertical; /* 設定伸縮盒子的子元素排列方式 */
  overflow: hidden;         /* 隱藏超出邊框的文字 */
}

.bg-mask {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(252,252,252,0) 1%,rgba(0,0,0,1) 100%);
}

.detail-info {
  position: relative;
  z-index: 2;
  margin-top: -300px;
}
</style>