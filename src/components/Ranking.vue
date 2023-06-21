<script lang="ts" setup>
import RankCandidate from './RankCandidate.vue';
import useCandidateStore from '../store/candidate';

let candidateStore = useCandidateStore();
</script>

<template>
  <TransitionGroup tag="div" name="list">
    <RankCandidate v-for="candidate in candidateStore.rankedCandidates" :key="candidate.id" :candidate="candidate">
    </RankCandidate>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-move {
  transition: all 1s ease;
}
</style>