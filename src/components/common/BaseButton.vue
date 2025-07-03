<template>
  <v-btn
    :color="color"
    :elevation="elevation"
    :loading="loading"
    :disabled="disabled"
    :block="block"
    :type="type"
    rounded
    size="large"
    class="font-weight-bold"
    v-bind="$attrs"
  >
    <slot />
  </v-btn>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'primary' },
  elevation: { type: [Number, String], default: 2 },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  type: { type: String, default: 'button' }
});
</script>