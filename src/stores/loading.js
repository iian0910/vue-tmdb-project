// src/stores/loading.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const activeRequests = ref(0)
  const isLoading = computed(() => activeRequests.value > 0)

  const showLoading = () => { activeRequests.value++ }
  const hideLoading = () => { activeRequests.value = Math.max(0, activeRequests.value - 1) }

  const withLoading = async (asyncFn) => {
    showLoading()
    try {
      return await asyncFn()
    } finally {
      hideLoading()
    }
  }

  return { activeRequests, isLoading, showLoading, hideLoading, withLoading }
})