<template>
  <div class="login-container">
    <h2>근태현황</h2>
    <BaseButton color="success" :loading="isLoading" @click="handleSave">저장</BaseButton>
  </div>
  <div v-if="dialog">
    <BaseCards
      title="저장 완료"
      message="API가 성공적으로 수정되었습니다."
      icon="mdi-check-circle"
      color="success"
      buttonText="확인"
      @close="closeCard"
      @action="closeCard"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCards from '@/components/common/BaseCards.vue'

const isLoading = ref(false)
const dialog = ref(false)

function handleSave() {
  dialog.value = true
  isLoading.value = true
  setTimeout(() => (isLoading.value = false), 3000)
}

function closeCard() {
  dialog.value = false
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