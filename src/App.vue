<script setup>
import { onMounted } from 'vue'
import { getPopularMovies } from '@/api/tmdb'


const fetchMovie = async() => {
  try {
    const res = await getPopularMovies()
    console.log('getPopularMovies', res.data.results)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchMovie()
})

</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
