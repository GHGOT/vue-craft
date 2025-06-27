<template>
  <v-container class="d-flex justify-center align-center fill-height w-full">
    <v-card class="pa-6" max-width="100%">
      <v-card-title class="text-h5 font-weight-bold justify-center">로그인</v-card-title>

      <v-form @submit.prevent="handleLogin" ref="form" lazy-validation>
        <v-text-field
          v-model="id"
          label="아이디"
          required
          prepend-icon="mdi-account"
        />

        <v-text-field
          v-model="password"
          label="비밀번호"
          type="password"
          required
          prepend-icon="mdi-lock"
        />

        <v-btn type="submit" color="primary" class="mt-4" block>로그인</v-btn>

        <v-alert
          v-if="errorMessage"
          type="error"
          class="mt-4"
          dense
          border="start"
        >
          {{ errorMessage }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const id = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    const success = await authStore.login(id.value, password.value, '0')
    if (success.result == 0) {
      router.push('/Dashboard')
    } else {
      errorMessage.value = '로그인에 실패했습니다.'
    }
  } catch (e) {
    console.log(e)
    errorMessage.value = '서버 오류가 발생했습니다.'
  }
}
</script>

<style scoped>
/* Vuetify 자체 스타일을 주로 사용하므로, 커스텀 스타일 최소화 */
</style>
