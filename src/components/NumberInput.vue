<script lang="ts" setup>
import { ref, watch } from 'vue';
import { VChip, VBtn } from 'vuetify/components';

const props = defineProps<{
  model: number
}>();

const emit = defineEmits<{
  (e: 'c', val: number): void,
}>()

const
  val = ref(props.model.toString()),
  legal = ref(true);

watch(val, n => {
  const num = parseInt(n);
  if (Number.isFinite(num)) {
    emit('c', num);
    legal.value = true;
  } else {
    legal.value = false;
  }
});
</script>

<template>
  <v-chip>
    <v-btn class="px-1" variant="text" rounded="xl" @click="val = (model - 1).toString();">-</v-btn>
    <input type="text" class="text-center" v-model="val">
    <v-btn class="px-1" variant="text" rounded="xl" @click="val = (model + 1).toString();">+</v-btn>
  </v-chip>
</template>
