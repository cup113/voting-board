<script lang="ts" setup>
import { VChip } from 'vuetify/components';
import type { Candidate } from '../store/candidate';

defineProps<{
  candidate: Candidate,
}>();
</script>

<template>
  <v-chip>{{ candidate.rank }} {{ candidate.name }} {{ candidate.voteNum }}</v-chip>
</template>
