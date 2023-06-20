import { defineStore } from 'pinia';
import type { Candidate } from './candidate';
import { ref, reactive, type Ref, computed } from 'vue';
import { nanoid } from 'nanoid';

export class Vote {
  public candidate: Candidate;
  public value: number;
  public id: string;
  public undone: boolean = false;
  public timeGenerated: Date;

  constructor(candidate: Candidate, value: number) {
    this.candidate = candidate;
    this.value = value;
    this.undone = false;
    this.id = nanoid();
    this.timeGenerated = new Date();
  }
}

const useVoteStore = defineStore("vote", () => {
  const voteHistory: Vote[] = reactive([]),
    countInvalid: Ref<number> = ref(0),
    unit: Ref<number> = ref(1),
    countValid: Ref<number> = ref(0),
    countTotal = computed(() => countValid.value + countInvalid.value)
    ;

  function vote_for(candidate: Candidate, addToHistory: boolean) {
    candidate.voteNum += unit.value;
    countValid.value += unit.value;
    if (addToHistory) {
      voteHistory.unshift(new Vote(candidate, unit.value));
      if (voteHistory.length >= 10) {
        voteHistory.pop();
      }
    }
  }

  function undo_redo_vote(vote: Vote) {
    const valDiff = vote.undone ? vote.value : (-vote.value);
    vote.candidate.voteNum += valDiff;
    countValid.value += valDiff;
    vote.undone = !vote.undone;
  }

  return {
    voteHistory,
    unit,
    countInvalid,
    countValid,
    countTotal,
    vote_for,
    undo_redo_vote,
  };
});

export default useVoteStore;
