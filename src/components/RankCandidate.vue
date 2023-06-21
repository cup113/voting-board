<script lang="ts" setup>
import { VChip } from 'vuetify/components';
import type { Candidate } from '../store/candidate';

defineProps<{
  candidate: Candidate,
}>();
</script>

<template>
  <v-chip class="px-0">
    <v-chip>第 {{ candidate.rank }} 名</v-chip>
    <v-chip>{{ candidate.name }}</v-chip>
    <v-chip>{{ candidate.voteNum }} 票</v-chip>
  </v-chip>
</template>
