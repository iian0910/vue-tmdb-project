<script setup>
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { useLoadingStore } from './stores/loading'
import { storeToRefs } from 'pinia'

const route = useRoute()
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)


</script>

<template>
  <v-app>
    <v-overlay
      :model-value="isLoading"
      class="align-center justify-center"
      persistent
      opacity="1"
      scrim="#121212"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
        width="6"
      />
    </v-overlay>
    <v-main>
      <Header  v-if="!isLoading && !route.meta.hideFooter"/>
      <router-view />
      <Footer v-if="!isLoading && !route.meta.hideFooter"/>
    </v-main>
  </v-app>
</template>
