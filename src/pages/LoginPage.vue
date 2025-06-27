<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="id" placeholder="아이디" required />
      <input type="password" v-model="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
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
  try{

    const success = await authStore.login(id.value, password.value, '0')    
    if (success.result == 0) {      
      router.push('/Dashboard') // 로그인 성공 시 메인 페이지로
    } else {
      errorMessage.value = '로그인에 실패했습니다.'
    }
  } catch(e) {
    console.log(e)
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
.error {
  color: red;
}
</style>