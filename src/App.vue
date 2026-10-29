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
// onMounted(() => {
//   fetchMovie()
// })

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn color="primary" prepend-icon="mdi-check">
          Hello Vuetify 3!
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
