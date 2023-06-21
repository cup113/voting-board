<script setup lang="ts">
import { VApp, VRow, VCol, VMain, VDivider } from 'vuetify/components';
import Subject from './components/Subject.vue';
import HistoryBoard from './components/HistoryBoard.vue';
import Operation from './components/Operation.vue';
import Ranking from './components/Ranking.vue';
</script>

<template>
  <v-app>
    <v-main>
      <Subject></Subject>
      <HistoryBoard class="mx-4 mb-6"></HistoryBoard>
      <v-divider></v-divider>
      <v-row class="ma-4">
        <v-col cols="12" md="6" lg="5"><Operation></Operation></v-col>
        <v-col cols="12" md="6" lg="7"><Ranking></Ranking></v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<style lang="scss"></style>
