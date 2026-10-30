<script setup>
import router from '@/router'

const backHome = () => {
  router.push('/')
}
</script>

<template>
  <v-toolbar style="background-color: transparent;">
    <template v-slot:prepend>
      <v-btn
        prepend-icon="mdi-arrow-left"
        @click="backHome"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
        <span class="text-white">返回</span>
      </v-btn>
    </template>
  </v-toolbar>
</template>