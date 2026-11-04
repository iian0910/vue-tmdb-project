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

// methods
const getToken = async() => {
  try {
    const { data } = await getTempToken()
    if (data.success) {
      sessionWithExpiry.setItem('tempToken', data.request_token)
      canSingIn.value = true
    }
  } catch (error) {
    console.log(error)
  }
}

const login = async() => {
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
      sessionWithExpiry.removeItem('tempToken')
    }
  } catch (error) {
    console.log(error)
  }
  
}

const getLongSession = async(token) => {
  try {
    const { data } = await getUserLongSession(token)
    if (data.success) {
      authStore.setToken(data.session_id)
      router.push('/')
    } else {
      sessionWithExpiry.removeItem('tempToken')
    }
  } catch (error) {
    console.log(error)
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
      <div class="d-flex justify-center" v-if="!canSingIn">
        <v-btn
          variant="outlined"
          color="error"
          size="x-large"
          class="mx-3 rounded"
          @click="getToken"
        >
          需先取得臨時 Token
        </v-btn>
      </div>
      <div v-else>
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