<template>
  <v-card
    class="mx-auto my-4"
    :color="color"
    elevation="8"
    max-width="400"
  >
    <v-card-title class="d-flex align-center">
      <v-icon v-if="icon" class="me-2">{{ icon }}</v-icon>
      <span>{{ title }}</span>
      <v-spacer />
      <v-btn icon variant="text" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      {{ message }}
    </v-card-text>
    <v-card-actions v-if="buttonText">
      <v-btn color="white" text @click="$emit('action')">{{ buttonText }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  title: { type: String, default: '알림' },
  message: { type: String, required: true },
  icon: { type: String, default: 'mdi-information' },
  color: { type: String, default: 'primary' },
  buttonText: { type: String, default: '' }
})
defineEmits(['close', 'action'])
</script>