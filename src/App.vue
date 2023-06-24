<script setup lang="ts">
import { VApp, VRow, VCol, VMain, VDivider } from 'vuetify/components';
import Subject from './components/Subject.vue';
import HistoryBoard from './components/HistoryBoard.vue';
import Operation from './components/Operation.vue';
import Ranking from './components/Ranking.vue';
import Settings from './components/Settings.vue';
</script>

<template>
  <v-app>
    <Subject></Subject>
    <v-main>
      <HistoryBoard class="mx-4 my-6"></HistoryBoard>
      <v-divider></v-divider>
      <v-row class="ma-4">
        <v-col cols="12" md="6" lg="5">
          <Operation></Operation>
        </v-col>
        <v-col cols="12" md="6" lg="7">
          <Ranking></Ranking>
        </v-col>
      </v-row>
    </v-main>
    <Settings></Settings>
  </v-app>
</template>

<style lang="scss"></style>
