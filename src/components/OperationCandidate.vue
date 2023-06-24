<script lang="ts" setup>
import { VBtn, VCol, VChip } from 'vuetify/components';
import type { Candidate } from '../store/candidate';
import useVoteStore from '../store/vote';

defineProps<{
  candidate: Candidate,
}>();

const voteStore = useVoteStore();
</script>

<template>
  <v-col class="px-1 pb-1" cols="2" sm="4" md="3">
    <v-btn class="text-none px-2" @click="voteStore.vote_for_id(candidate.id, true)">
      <v-chip>{{ candidate.id }}</v-chip>&nbsp;{{ candidate.name }}
    </v-btn>
  </v-col>
</template>
