<script lang="ts" setup>
import useVoteStore from '../store/vote';
import Record from './Record.vue';
const voteStore = useVoteStore();
</script>

<template>
  <TransitionGroup name="list" tag="div">
    <Record v-for="vote in voteStore.voteHistory" :vote="vote" :key="vote.id"></Record>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-leave-active,
.list-move {
  transition: all 1s ease;
}

.list-enter-active {
  transition: all 0.5s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(3em);
}

.list-leave-active {
  position: absolute;
}
</style>
