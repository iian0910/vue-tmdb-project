<script setup>
import router from '@/router/index'
import { userLogout } from '@/api/tmdb'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// methods
const logout = async() => {
  try {
    const session_id = sessionStorage.getItem('session_id')
    const { data } = await userLogout(session_id)

    if (data.success) {
      authStore.clearSessionID()
      authStore.clearAccountID()

      router.push('/login')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <v-app-bar
    color="background"
    class="border-b-md
    border-surface"
  >
    <v-app-bar-title>
      <router-link to="/" class="text-decoration-none text-white">TMDB 影視館</router-link>
    </v-app-bar-title>

    <v-btn
      v-if="authStore.isLogin"
      variant="outlined"
      color="error"
      class="mx-3 rounded"
      @click="logout"
    >
      登出
    </v-btn>
  </v-app-bar>
</template>

<style lang="scss" scoped>

</style>