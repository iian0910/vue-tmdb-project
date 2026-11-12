<script setup>
import { ref } from 'vue'
import { useWindowSize } from '@/composables/useDeviceSize'
import { useRouter } from 'vue-router'

import SwitchBtn from './SwitchBtn.vue';

const { isMobile } = useWindowSize()
const router = useRouter()

// props
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  movieList: {
    type: Array,
    default: () => ([])
  },
  showMore: {
    type: Boolean,
    default: false
  },
  pageName: {
    type: String,
    default: ''
  },
  showSwitchBtn: {
    type: Boolean,
    default: false
  },
  switchItem: {
    type: Array,
    default: () => ([])
  }
})

// emit
const emit = defineEmits(['selectOption'])

// data
const selectedCard = ref(null)

// methods
const goToPage = (pageName) => {
  router.push(pageName)
}
const goToDetail = (id) => {
  router.push({
    name: 'MovieDetailInfo',
    params: { id }
  })
}
const selectOption = (e) => {
  emit('selectOption', e)
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 class="pl-10 my-0 text-title-large">{{ title }}</h1>
      <SwitchBtn
        v-if="showSwitchBtn"
        class="mr-10"
        :switch-item="switchItem"
        @selectOption="selectOption"
      />
    </div>
    <v-slide-group
      v-model="selectedCard"
      class="pa-4"
      selected-class="bg-primary"
      :show-arrows="isMobile ? false : 'always'"
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
          @click="goToDetail(movie.id)"
        >
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="poster-img"
          />
        </v-card>
      </v-slide-group-item>
      <v-slide-group-item v-if="showMore">
        <v-card
          class="poster-container more ma-3"
          color="grey-lighten-4"
          width="260"
          elevation="2"
          rounded="xl"
          @click="goToPage(pageName)"
        >
          <div class="d-flex justify-center h-100">
            <p class="text-body-large align-self-center text-white">看更多...</p>
          </div>
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
  background-color: transparent;

  &.more {
    background-color: #2d3748;
  }
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>