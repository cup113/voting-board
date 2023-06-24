<script lang="ts" setup>
import { computed } from 'vue';
import useVoteStore from '../store/vote';
import useCandidateStore from '../store/candidate';
import type { Vote } from '../store/vote';
import { VChip, VBtn } from 'vuetify/components'

const props = defineProps<{
  vote: Vote
}>();

const voteStore = useVoteStore();
const candidateStore = useCandidateStore();

const
  operationName = computed(() => props.vote.undone ? "重投" : "撤销"),
  mainColor = computed(() => props.vote.undone ? "red" : "primary"),
  valueColor = computed(() => {
    if (props.vote.value > 0) { return 'green'; }
    else if (props.vote.value < 0) { return 'red'; }
    else { return 'primary' };
  }),
  candidateName = computed(() => candidateStore.get_candidate(props.vote.candidateId)?.name),
  btnColor = computed(() => props.vote.undone ? 'green' : 'red'),
  value = computed(() => (props.vote.value >= 1 ? '+' : '') + props.vote.value.toString()),
  time = computed(() => props.vote.timeGenerated.toLocaleTimeString());
</script>

<template>
  <v-chip :color="mainColor">
    <v-chip>{{ time }}</v-chip>
    <v-chip>{{ candidateName }}</v-chip>
    <v-chip :color="valueColor">{{ value }}</v-chip>
    <v-btn :color="btnColor" variant="text" rounded="xl" @click="voteStore.undo_redo_vote(vote)">{{ operationName }}</v-btn>
  </v-chip>
</template>
