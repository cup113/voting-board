<script lang="ts" setup>
import useVoteStore from '../store/vote';
import { VChip } from 'vuetify/components';

const voteStore = useVoteStore();
</script>

<template>
  <v-chip>
    总票数: <v-chip>{{ voteStore.countTotal }}</v-chip> (
    <v-chip>{{ voteStore.countValid }}</v-chip> 有效 | <v-chip>{{ voteStore.countInvalid }}</v-chip> 无效)
  </v-chip>
</template>
