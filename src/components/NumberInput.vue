<script lang="ts" setup>
import { ref, watch } from 'vue';
import { VRow, VBtn, VTextField } from 'vuetify/components';
import { mdiMinus, mdiPlus } from '@mdi/js';

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
  <v-row class="ma-0" align="center">
    <v-btn class="px-1" variant="text" rounded="xl" @click="val = (model - 1).toString();" :icon="mdiMinus">
    </v-btn>
    <v-text-field label="单次投票数" type="number" v-model="val" class="inline"></v-text-field>
    <v-btn class="px-1" variant="text" rounded="xl" @click="val = (model + 1).toString();" :icon="mdiPlus">
    </v-btn>
  </v-row>
</template>
