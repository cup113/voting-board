<script lang="ts" setup>
import { VBtn, VChip } from 'vuetify/components';
import type { Candidate } from '../store/candidate';
import useVoteStore from '../store/vote';

defineProps<{
  candidate: Candidate,
}>();

const voteStore = useVoteStore();
</script>

<template>
  <v-btn class="text-none px-2" @click="voteStore.vote_for_id(candidate.id)">
    <v-chip>{{ candidate.id }}</v-chip>&nbsp;{{ candidate.name }}
  </v-btn>
</template>
