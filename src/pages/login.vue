<script setup>
import { onMounted, ref } from 'vue'
import { getTempToken, userLogin, getUserLongSession } from '@/api/tmdb'
import { sessionWithExpiry } from '@/util/sessionWithExpiry'
import { useAuthStore } from '@/stores/auth'

import router from '@/router'
import PageLoading from '@/components/PageLoading.vue'

const authStore = useAuthStore()

// data
const account = ref('ian0910')
const passWord = ref('@@##QWEasd0910')
const isBtnLoading = ref(false)
const isLoading = ref(false)
const hiddenPassWord = ref(false)

// methods
const getToken = async() => {
  isLoading.value = true
  try {
    const { data } = await getTempToken()
    if (data.success) {
      sessionWithExpiry.setItem('tempToken', data.request_token)
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const login = async() => {
  isBtnLoading.value = true
  const userInfo = {
    username: account.value,
    password: passWord.value,
    request_token: sessionWithExpiry.getItem('tempToken')
  }
  try {
    const { data } = await userLogin(userInfo)
    if (data.success) {
      getLongSession(data.request_token)
    } else {
      sessionStorage.removeItem('tempToken')
      isBtnLoading.value = false
    }
  } catch (error) {
    console.log(error)
    isBtnLoading.value = false
  }
  
}

const getLongSession = async(token) => {
  try {
    const { data } = await getUserLongSession(token)
    if (data.success) {
      authStore.setSessionID(data.session_id)
      router.push('/')
    } else {
      sessionStorage.removeItem('tempToken')
    }
  } catch (error) {
    console.log(error)
  } finally {
    sessionStorage.removeItem('tempToken')
    isBtnLoading.value = false
  }
}

const signIn = () => {
  window.open('https://www.themoviedb.org/signup', '_blank')
}

onMounted(() => {
  if(sessionStorage.getItem('tempToken') === null) {
    getToken()
  }
})

</script>

<template>
  <PageLoading
    v-if="isLoading"
    :is-loading="isLoading"
  />
  <v-container
    class="h-100 d-flex justify-center align-center"
  >
    <v-card
      border="sm"
      class="pa-6"
      rounded="xl"
      width="500"
    >
      <div>
        <h1 class="text-center">登入</h1>
        <v-text-field
          class="my-3"
          hide-details="auto"
          label="帳號"
          variant="outlined"
          v-model="account"
        />
        <v-text-field
          class="my-3"
          hide-details="auto"
          label="密碼"
          variant="outlined"
          v-model="passWord"
          :type="hiddenPassWord ? 'password' : ''"
        >
          <template v-slot:append-inner>
            <v-icon :icon="hiddenPassWord ? 'mdi mdi-eye-off' : 'mdi mdi-eye'" start @click="hiddenPassWord = !hiddenPassWord"></v-icon>
          </template>
        </v-text-field>
        <div class="d-flex justify-center mt-8">
          <v-btn
            variant="outlined"
            color="primary"
            size="x-large"
            class="mx-3 rounded"
            @click="login"
            :loading="isBtnLoading"
          >
            登入
          </v-btn>
          <v-btn
            variant="outlined"
            color="secondary"
            size="x-large"
            class="mx-3 rounded"
            @click="signIn"
          >
            註冊
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
</style>