<script lang="ts" setup>
import RankCandidate from './RankCandidate.vue';
import useCandidateStore from '../store/candidate';

let candidateStore = useCandidateStore();
</script>

<template>
  <div>
    <RankCandidate v-for="[id, candidate] in candidateStore.candidates" :key="id" :candidate="candidate">
    </RankCandidate>
  </div>
</template>
