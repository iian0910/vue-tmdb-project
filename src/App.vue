<script setup>
import Footer from '@/components/Footer.vue'
import { useLoadingStore } from './stores/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoadingStore()
// 使用 storeToRefs 確保解構出的 isLoading 保持響應性
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
      <router-view />
      <Footer v-if="!isLoading"/>
    </v-main>
  </v-app>
</template>
