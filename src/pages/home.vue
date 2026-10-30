<script setup>
import MovieCarousel from '../components/MovieCarousel.vue'
import MovieSlide from '@/components/MovieSlide.vue'

</script>

<template>
  <MovieCarousel/>
  <v-container>
    <MovieSlide
      title="熱門電影"
    />
  </v-container>
</template>

<style lang="scss" scoped>
</style>