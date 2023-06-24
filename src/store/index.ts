import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { number_wrapper, type NumberWrapper } from '../assets/ts/number_wrapper';
import useVoteStore from './vote';
import useCandidateStore from './candidate';
import { LocalStorageManager } from './local_storage';

export const localStorageManager = new LocalStorageManager("VtBd_");

const useStore = defineStore("index", () => {
  const
    subject: Ref<string> = localStorageManager.use("subject", "hello"),
    rankSep: Ref<number> = localStorageManager.use("rankSep", 1),
    rankSepWrapper: NumberWrapper = number_wrapper(rankSep, s => {
      const num = parseInt(s);
      return num < 1 ? NaN : num;
    }),
    showSettings: Ref<boolean> = ref(false),
    showImportExport: Ref<boolean> = ref(false),
    showEditCandidates: Ref<boolean> = ref(false)
    ;
  useTitle(() => `${subject.value} - 计票器`);

  function clear_vote_progress() {
    console.log(1);
    const voteStore = useVoteStore();
    const candidateStore = useCandidateStore();
    voteStore.countValid = 0;
    voteStore.countInvalid = 0;
    voteStore.unit = 1;
    voteStore.voteHistory.splice(0, voteStore.voteHistory.length);
    candidateStore.candidates.forEach(candidate => {
      candidate.voteNum = 0;
      candidate.rank = 1;
    });
  }

  function export_data(): string {
    return JSON.stringify(localStorageManager, undefined, 2);
  }

  function import_data(text: string) {
    localStorageManager.update_from_JSON(JSON.parse(text));
  }

  return {
    subject,
    rankSep,
    rankSepWrapper,
    showSettings,
    showImportExport,
    showEditCandidates,
    clear_vote_progress,
    export_data,
    import_data,
  };
});

export default useStore;
