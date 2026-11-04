import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token'))
  const isLogin = computed(() => token.value !== null)

  const setToken = (newToken) => {
    token.value = newToken
    sessionStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = null
    sessionStorage.removeItem('token')
  }

  return {
    token,
    isLogin,
    setToken,
    clearToken
  }
})