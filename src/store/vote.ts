import { defineStore } from 'pinia';
import type { Candidate } from './candidate';
import { computed, type Ref, type ComputedRef } from 'vue';
import { nanoid } from 'nanoid';
import useCandidateStore from './candidate';
import { localStorageManager } from '.';

interface SerializedVote {
  candidateId: string;
  value: number;
  id: string;
  undone: boolean;
  timeGenerated: string;
}

export class Vote {
  public candidateId: string;
  public value: number;
  public id: string;
  public undone: boolean = false;
  public timeGenerated: Date;

  constructor(candidateId: string, value: number) {
    this.candidateId = candidateId;
    this.value = value;
    this.undone = false;
    this.id = nanoid();
    this.timeGenerated = new Date(Math.floor(Date.now() / 1000) * 1000);
  }

  public toJSON(): SerializedVote {
    return {
      candidateId: this.candidateId,
      value: this.value,
      id: this.id,
      undone: this.undone,
      timeGenerated: this.timeGenerated.toLocaleString(),
    }
  }

  static fromJSON(obj: SerializedVote): Vote {
    const vote = new Vote(obj.candidateId, obj.value);
    vote.undone = obj.undone;
    vote.id = obj.id;
    vote.timeGenerated = new Date(obj.timeGenerated);
    return vote;
  }
}

const useVoteStore = defineStore("vote", () => {
  const
    voteHistory: Ref<Vote[]> = localStorageManager.use("voteHistory", [], {
      serializer: {
        read(raw) {
          const arr = JSON.parse(raw) as SerializedVote[];
          return arr.map(Vote.fromJSON);
        },
        write(value) {
          return JSON.stringify(value);
        },
      }
    }),
    countVisibleHistory = localStorageManager.use("countVisibleHistory", 10),
    voteHistoryDisplay: ComputedRef<Vote[]> = computed(() => {
      return voteHistory.value.slice(Math.max(0, voteHistory.value.length - countVisibleHistory.value)).reverse();
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

  function undo_redo_vote(vote: Vote) {
    const valDiff = vote.undone ? vote.value : (-vote.value);
    vote.undone = !vote.undone;
    vote_for_id(vote.candidateId, false, valDiff);
  }

  function vote_for_id(id: string, addToHistory: boolean, num?: number) {
    const candidateStore = useCandidateStore();
    const candidate = candidateStore.get_candidate(id);
    if (candidate === undefined) {
      return; // TODO alert
    }
    const voteDiff = num ?? unit.value;
    candidate.voteNum += voteDiff;
    countValid.value += voteDiff;
    if (addToHistory) {
      voteHistory.value.push(new Vote(candidate.id, voteDiff));
    }
    change_rank(candidate, voteDiff);
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
