<template>
  <div>
    <h1>로또 번호 생성기</h1>
    <button @click="generateLottoNumbers">번호 생성</button>
    <div v-if="lottoNumbers.length">
      <p>생성된 로또 번호:</p>
      <ul>
        <li v-for="(number, index) in lottoNumbers" :key="index">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const lottoNumbers = ref([]);

/**
 * 1부터 45 사이의 중복되지 않는 6개의 숫자를 생성하여 로또 번호로 설정합니다.
 */
function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    // 1부터 45 사이의 난수 생성
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  // 생성된 숫자들을 오름차순으로 정렬
  lottoNumbers.value = numbers.sort((a, b) => a - b);
}

</script>

<style scoped>
/* 여기에 필요한 스타일을 추가합니다. */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
