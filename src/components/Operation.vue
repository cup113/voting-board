<script lang="ts" setup>
import useCandidateStore from '../store/candidate';
import useVoteStore from '../store/vote';
import OperationCandidate from './OperationCandidate.vue';
import NumberInput from './NumberInput.vue';
import Stat from './Stat.vue';
import { VBtn, VRow } from 'vuetify/components';

const voteStore = useVoteStore();
const candidatesStore = useCandidateStore();

function change_vote_unit(val: number) {
  voteStore.unit = val;
}
</script>

<template>
  <div>
    <Stat></Stat>
    <div class="mt-4">
      <NumberInput :model="voteStore.unit" @c="change_vote_unit"></NumberInput>
      <v-btn @click="voteStore.countInvalid += voteStore.unit;" color="error">废票</v-btn>
    </div>
    <v-row class="mt-2">
      <OperationCandidate :candidate="candidate" v-for="[id, candidate] in candidatesStore.candidates" :key="id"></OperationCandidate>
    </v-row>
  </div>
</template>
