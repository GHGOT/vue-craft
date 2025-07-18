<template>
  <v-combobox
    v-model="modelValue"
    :items="items"
    :label="label"
    :multiple="multiple"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :loading="loading"
    @update:modelValue="updateValue"
    v-bind="$attrs"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: '' },
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  modelValue.value = val
})

function updateValue(val) {
  emit('update:modelValue', val)
}
</script>