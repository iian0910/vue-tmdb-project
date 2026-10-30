import { onMounted, onUnmounted, ref, computed } from "vue"

export function useWindowSize() {
  
  const width = ref(typeof window !== 'undefined' ? window.innerHeight : 0)
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0)

  function update() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  const isMobile = computed(() => width.value < 768)
  const isTablet = computed(() => width.value >= 768 && width.value < 1024)
  const isDesktop = computed(() => width.value >= 1024)
  
  return {
    isMobile,
    isTablet,
    isDesktop
  }
}