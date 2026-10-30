<script setup>
import MovieCarousel from '../components/MovieCarousel.vue'
import MovieSlide from '@/components/MovieSlide.vue'
import Footer from '@/components/Footer.vue';

</script>

<template>
  <MovieCarousel/>
  <v-container>
    <MovieSlide
      title="熱門電影"
    />
  </v-container>
  <Footer/>
</template>

<style lang="scss" scoped>
</style>