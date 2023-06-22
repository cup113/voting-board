<script lang="ts" setup>
import { VChip } from 'vuetify/components';
import type { Candidate } from '../store/candidate';
import { computed } from 'vue';
import useStore from '../store';

const props = defineProps<{
  candidate: Candidate,
}>();

const store = useStore();

const rank = computed(() => props.candidate.rank);
const color = computed(() => rank.value <= store.rankSep ? 'success' : 'primary');
</script>

<template>
  <v-chip class="px-0" :color="color">
    <v-chip>第 {{ rank }} 名</v-chip>
    <v-chip>{{ candidate.name }}</v-chip>
    <v-chip>{{ candidate.voteNum }} 票</v-chip>
  </v-chip>
</template>
