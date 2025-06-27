<template>
  <v-navigation-drawer
    app
    v-model="isDrawerOpen"
    color="grey-lighten-4"
    permanent
  >
    <v-list nav dense>
      <v-list-item link to="/dashboard">
        <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
        <v-list-item-title>대시보드</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/settings">
        <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
        <v-list-item-title>설정</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 외부에서 전달받는 drawer 상태
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
})

const emits = defineEmits(['update:modelValue'])

// 양방향 바인딩용 computed 작성
import { computed } from 'vue'
const isDrawerOpen = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>
