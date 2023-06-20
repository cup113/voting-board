<script lang="ts" setup>
import useCandidateStore from '../store/candidate';
import { VBtn } from 'vuetify/components';
import type { Candidate } from '../store/candidate';

defineProps<{
  candidate: Candidate,
}>();

const candidatesStore = useCandidateStore();
</script>

<template>
  <v-btn class="text-none" @click="candidatesStore.vote_for_id(candidate.id)">
    {{ candidate.id }} {{ candidate.name }}
  </v-btn>
</template>
