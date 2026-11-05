<script setup>
import { useAlert } from '@/composables/useAlert'

const { visible, message, type, hideAlert } = useAlert()
</script>

<template>
  <div v-if="visible" class="alert-container">
    <v-alert
      :text="message"
      :type="type"
      closable
      elevation="4"
      @click:close="hideAlert"
    />
  </div>
</template>

<style scoped>
.alert-container {
  position: fixed;
  bottom: 50px;
  right: 10px;
  z-index: 99999; /* 確保高於 v-overlay 與導航列 */
  min-width: 320px;
  max-width: 480px;
}
</style>