import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useAuthStore = defineStore('auth', () => {
  const session_id = ref(sessionStorage.getItem('session_id'))
  const account_id = ref(sessionStorage.getItem('account_id'))

  const isLogin = computed(() => session_id.value !== null)

  const setSessionID = (newID) => {
    session_id.value = newID
    sessionStorage.setItem('session_id', newID)
  }

  const clearSessionID = () => {
    session_id.value = null
    sessionStorage.removeItem('session_id')
  }

  const setAccountID = (newID) => {
    account_id.value = newID
    sessionStorage.setItem('account_id', newID)
  }

  const clearAccountID = () => {
    account_id.value = null
    sessionStorage.removeItem('account_id')
  }

  return {
    session_id,
    isLogin,
    setSessionID,
    clearSessionID,
    setAccountID,
    clearAccountID
  }
})