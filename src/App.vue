<script setup>
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Alert from './components/Alert.vue';

const route = useRoute()
</script>

<template>
  <v-app>
    <Alert />
    <v-main>
      <Header v-if="!route.meta.hideHeader"/>
      <router-view />
      <Footer v-if="!route.meta.hideFooter"/>
    </v-main>
  </v-app>
</template>
