<script lang="ts" setup>
import useStore from '../store';
import { VAppBar, VIcon, VAppBarTitle } from 'vuetify/components';
import { mdiCog } from '@mdi/js';
const store = useStore();

</script>

<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-icon :icon="mdiCog" @click="store.showSettings = true;"></v-icon>
    </template>
    <v-app-bar-title>{{ store.subject }}</v-app-bar-title>
  </v-app-bar>
</template>
