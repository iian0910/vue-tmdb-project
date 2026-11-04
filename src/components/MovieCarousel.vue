<script setup>
import { useWindowSize } from '@/composables/useDeviceSize'
import { useRouter } from 'vue-router'

const { isMobile } = useWindowSize()
const router = useRouter()

// props
const props = defineProps({
  moveList: {
    type: Array,
    default: () => ([])
  }
})

// methods
const goToDetail = (id) => {
  router.push({
    name: 'MovieDetailInfo',
    params: { id }
  })
}
</script>

<template>
  <div class="pa-4">
    <v-carousel
      class="rounded-xl"
      v-if="moveList.length > 0"
      hide-delimiters
      :show-arrows="false"
      :height="isMobile ? '600' : '800'"
      show-arrows="hover"
      cycle
      hide-delimiter-background
      crossfade
    >
      <v-carousel-item
        v-for="(movie, i) in moveList"
        :key="i"
        :src="`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`"
        cover
      >
        <div class="carousel-gradient-overlay d-flex align-end">
          <v-container>
            <div class="text-white movie-info">
              <h3 class="text-headline-small text-md-headline-large font-weight-bold mb-3">{{movie.title}}</h3>
              <p class="text-body-medium text-md-body-large overview-text">{{movie.overview || '目前無電影描述'}}</p>
              <v-btn
                variant="outlined"
                color="secondary"
                size="x-large"
                class="rounded-pill mt-5"
                @click="goToDetail(movie.id)"
              >
                詳細介紹
              </v-btn>
            </div>
          </v-container>
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
  width: 550px;
  margin-bottom: 150px;

  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 0px;
  }
}

.overview-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}
</style>