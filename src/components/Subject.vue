<script lang="ts" setup>
import useStore from '../store';
import { VAppBar, VAppBarNavIcon, VAppBarTitle } from 'vuetify/components';
const store = useStore();
</script>

<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click="store.showSettings = true;"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>{{ store.subject }}</v-app-bar-title>
  </v-app-bar>
</template>
