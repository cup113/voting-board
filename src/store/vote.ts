import { defineStore } from 'pinia';
import type { Candidate } from './candidate';
import { reactive, computed, type Ref, type ComputedRef } from 'vue';
import { nanoid } from 'nanoid';
import useCandidateStore from './candidate';
import { localStorageManager } from '.';

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
  const
    voteHistory: Vote[] = reactive([]),
    countVisibleHistory = localStorageManager.use("countVisibleHistory", 10),
    voteHistoryDisplay: ComputedRef<Vote[]> = computed(() => {
      return voteHistory.slice(Math.max(0, voteHistory.length - countVisibleHistory.value)).reverse();
    }),
    countInvalid: Ref<number> = localStorageManager.use("vote_countInvalid", 0),
    unit: Ref<number> = localStorageManager.use("vote_unit", 1),
    countValid: Ref<number> = localStorageManager.use("vote_countValid", 0),
    countTotal: ComputedRef<number> = computed(() => countValid.value + countInvalid.value)
    ;

  function change_rank(candidate: Candidate, voteDiff: number) {
    if (voteDiff == 0) {
      return;
    }
    const
      voteOrigin = candidate.voteNum - voteDiff,
      voteCurrent = candidate.voteNum;
    const candidateStore = useCandidateStore();
    for (const otherCandidate of candidateStore.candidates.values()) {
      if (otherCandidate.id === candidate.id) {
        continue;
      }
      const voteOther = otherCandidate.voteNum;
      if (voteDiff > 0) {
        if (voteOther <= voteCurrent && voteOther >= voteOrigin) {
          if (voteOrigin < voteOther) {
            candidate.rank--;
          }
          if (voteOther < voteCurrent) {
            otherCandidate.rank++;
          }
        }
      } else {
        // voteDiff > 0
        if (voteOther <= voteOrigin && voteOther >= voteCurrent) {
          if (voteOrigin > voteOther) {
            otherCandidate.rank--;
          }
          if (voteCurrent < voteOther) {
            candidate.rank++;
          }
        }
      }
    }
  }

  function vote_for(candidate: Candidate, addToHistory: boolean, num?: number) {
    const voteDiff = num ?? unit.value;
    candidate.voteNum += voteDiff;
    countValid.value += voteDiff;
    if (addToHistory) {
      voteHistory.push(new Vote(candidate, voteDiff));
    }
    change_rank(candidate, voteDiff);
  }

  function undo_redo_vote(vote: Vote) {
    const valDiff = vote.undone ? vote.value : (-vote.value);
    vote.undone = !vote.undone;
    vote_for(vote.candidate, false, valDiff);
  }

  function vote_for_id(id: string) {
    const candidateStore = useCandidateStore();
    const candidate = candidateStore.candidates.get(id);
    if (candidate === undefined) {
      return; // TODO
    }
    vote_for(candidate, true);
  }

  return {
    voteHistory,
    voteHistoryDisplay,
    countVisibleHistory,
    unit,
    countInvalid,
    countValid,
    countTotal,
    vote_for_id,
    undo_redo_vote,
  };
});

export default useVoteStore;
