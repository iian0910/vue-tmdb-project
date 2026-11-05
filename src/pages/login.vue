<script setup>
import { onMounted, ref } from 'vue'
import { getTempToken, userLogin, getUserLongSession } from '@/api/tmdb'
import { sessionWithExpiry } from '@/util/sessionWithExpiry'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

// data
const canSingIn = ref(false)
const account = ref('')
const passWord = ref('')
const isBtnLoading = ref(false)

// methods
const getToken = async() => {
  isBtnLoading.value = true
  try {
    const { data } = await getTempToken()
    if (data.success) {
      sessionWithExpiry.setItem('tempToken', data.request_token)
      canSingIn.value = true
    }
  } catch (error) {
    console.log(error)
  } finally {
    isBtnLoading.value = false
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
  if(sessionStorage.getItem('tempToken') !== null) {
    canSingIn.value = true
  } else {
    canSingIn.value = false
  }
})

</script>

<template>
  <v-container
    class="h-100 d-flex justify-center align-center"
  >
    <v-card
      border="sm"
      class="pa-6"
      rounded="xl"
      width="500"
    >
      <div class="d-flex justify-center flex-column" v-if="!canSingIn">
        <h3 class="text-center">需先取得臨時 Token 才可登入</h3>
        <v-btn
          variant="outlined"
          color="error"
          size="x-large"
          class="mx-3 rounded"
          @click="getToken"
          :loading="isBtnLoading"
        >
          取得 Token
        </v-btn>
      </div>
      <div v-else>
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
        />
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