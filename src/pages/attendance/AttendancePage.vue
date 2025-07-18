<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="12" class="text-h5">
        근태현황
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" sm="4" class="py-0">
            <BaseCombobox
              v-model="selectedAgency"
              label="현장"
              :items="item1"
              item-title="title"
              item-value="value"
              return-object
            />
          </v-col>
          <v-col cols="12" sm="4" class="py-0">
            <BaseCombobox              
              label="팀" 
              :items="item2" 
              item-title="title" 
              item-value="value" 
            />
          </v-col>
          <v-col cols="12" sm="4" class="py-0">
            <BaseCombobox label="직종" :items="item3" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4" class="d-flex justify-end mt-2 mt-md-0">
        <BaseButton
          color="success"
          :loading="isLoading"
          @click="handleSave"
          min-width="120"
        >
          저장
        </BaseButton>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent width="300">
      <v-card>
        <v-card-title class="text-h5">저장 완료</v-card-title>
        <v-card-text>API가 성공적으로 수정되었습니다.</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" text @click="closeCard">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCombobox from '@/components/common/BaseCombobox.vue';
import { useAuthStore } from '@/stores/auth';
import { commonAgencyList, commonTeamList } from '@/api/common';

const isLoading = ref(false);
const dialog = ref(false);

const item1 = ref([]); // 현장 목록 (API로부터 채워짐)
const item2 = ref([]); // 팀 목록 (API로부터 채워짐)
const item3 = ref(['1', '2', '3']);

// Combobox의 item 형식({ title, value })과 일치시키고, return-object prop을 사용하므로 객체로 초기화합니다.
const selectedAgency = ref({ title: '전체', value: '9999' }); // 선택된 현장

const authStore = useAuthStore();
const currentUser = computed(() => authStore.getUser);

const fetchAgencyList = async () => {
  // 로그인 정보가 없으면 API를 호출하지 않습니다.
  if (!currentUser.value || !currentUser.value.companyCode) {
    console.warn('로그인 정보가 없어 현장 목록을 불러올 수 없습니다.');
    return;
  }

  try {
    const params = {
      companyCode: currentUser.value.companyCode,
      agencyCode: '9999', // 요구사항에 따라 이 값은 변경될 수 있습니다.
    };
    const result = await commonAgencyList(params);    

    // API 결과값을 BaseCombobox에 맞게 { title, value } 형태로 변환합니다.
    // name -> title (보여지는 텍스트), code -> value (실제 값)
    const agencies = result.data.map(item => ({ title: item.name, value: item.code }));
    // 현장 목록 맨 앞에 '전체' 옵션을 추가합니다.
    item1.value = [{ title: '전체', value: '9999' }, ...agencies];
  } catch (error) {
    console.error('현장 목록 조회 중 오류 발생:', error);
    // 에러가 발생하더라도 '전체' 옵션은 선택할 수 있도록 기본값을 설정합니다.
    item1.value = [{ title: '전체', value: '9999' }];
  }
};

const fetchTeamList = async (agencyCode) => {
  // 로그인 정보가 없으면 API를 호출하지 않습니다.
  if (!currentUser.value || !currentUser.value.companyCode) {
    console.warn('로그인 정보가 없어 팀 목록을 불러올 수 없습니다.');
    return;
  }

  try {
    const params = {
      agencyCode: agencyCode,
      startDate: '20250718',
      endDate: '20250718',
    };
    const result = await commonTeamList(params);

    if (result && Array.isArray(result.data)) {
      item2.value = result.data.map((item) => ({ title: item.name, value: item.code }));
    } else {
      console.error('API 응답에서 팀 목록(배열)을 찾을 수 없습니다.', result);
      item2.value = [];
    }
  } catch (error) {
    console.error('팀 목록 조회 중 오류 발생:', error);
    item2.value = [];
  }
};

// 선택된 현장(selectedAgency) 값이 변경될 때마다 팀 목록을 새로 불러옵니다.
// immediate: true 옵션을 추가하여 컴포넌트가 마운트될 때도 이 로직이 즉시 실행되도록 합니다.
// 이렇게 하면 onMounted에서 별도로 fetchTeamList를 호출할 필요가 없습니다.
watch(selectedAgency, (newAgency) => {
  item2.value = []; // 팀 목록을 비웁니다.  

  // newAgency는 이제 항상 { title, value } 형태의 객체이므로, .value로 코드에 접근합니다.
  if (newAgency && newAgency.value) {
    fetchTeamList(newAgency.value);
  }
}, { immediate: true });

// 컴포넌트가 화면에 마운트된 후 현장 목록을 가져옵니다.
onMounted(() => {
  fetchAgencyList();
});

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
</style>