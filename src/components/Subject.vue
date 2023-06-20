<script lang="ts" setup>
import useStore from '../store';
import { VTextField } from 'vuetify/components';
const store = useStore();
</script>

<template>
  <v-text-field v-model="store.subject" label="subject" single-line max-errors="0"></v-text-field>
</template>
