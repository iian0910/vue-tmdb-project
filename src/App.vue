<script setup>
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'
import { useLoadingStore } from './stores/loading'
import { storeToRefs } from 'pinia'
import router from './router'
import { userLogout } from './api/tmdb'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
const authStore = useAuthStore()

// methods
const logout = async() => {
  try {
    const userID = sessionStorage.getItem('token')
    const { data } = await userLogout(userID)

    if (data.success) {
      authStore.clearToken()
      router.push('/login')
    }
  } catch (error) {
    console.log(error)
  }
}
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
      <v-btn
          v-if="authStore.isLogin"
          variant="outlined"
          color="error"
          size="x-large"
          class="mx-3 rounded"
          @click="logout"
        >
          登出
        </v-btn>
      <router-view />
      <Footer v-if="!isLoading && !route.meta.hideFooter"/>
    </v-main>
  </v-app>
</template>
