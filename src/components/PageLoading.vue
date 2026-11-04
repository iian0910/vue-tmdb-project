<script setup>

// props
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <v-overlay
    v-if="isLoading"
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
</template>