import { defineStore } from 'pinia';
import { computed, type ComputedRef, type Ref } from 'vue';
import { type RemovableRef } from '@vueuse/core';
import { localStorageManager } from '.';

interface SerializedCandidate {
  id: string,
  name: string,
  voteNum: number,
  rank: number,
}

export class Candidate {
  public alive: boolean = true;
  public name: string;
  public readonly id: string;
  public voteNum: number = 0;
  public rank: number = 1;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  public toJSON(): SerializedCandidate {
    return {
      id: this.id,
      name: this.name,
      voteNum: this.voteNum,
      rank: this.rank,
    };
  }

  static fromObject(obj: SerializedCandidate): Candidate {
    var candidate = new Candidate(obj.name, obj.id);
    Object.assign(candidate, obj);
    return candidate;
  }
}

function use_candidates_local_storage(): RemovableRef<Map<string, Candidate>> {
  const initialValue = new Map([
    ["1", new Candidate("张三", "1")],
    ["2", new Candidate("李四", "2")]
  ]);
  return localStorageManager.use("candidates", initialValue, {
    serializer: {
      read(raw) {
        try {
          const parsed: SerializedCandidate[] = JSON.parse(raw);
          return new Map(parsed.map(obj => [obj.id, Candidate.fromObject(obj)]));
        } catch (e) {
          console.log(e) // TODO deal with it
          return initialValue;
        }
      },
      write(value) {
        return JSON.stringify([...value.values()]);
      },
    }
  });
}

const useCandidateStore = defineStore("candidate", () => {
  const
    candidates: Ref<Map<string, Candidate>> = use_candidates_local_storage(),
    rankedCandidates: ComputedRef<Candidate[]> = computed(() => {
      var result = Array.from(candidates.value.values());
      result.sort((a, b) => b.voteNum - a.voteNum);
      return result;
    })
    ;

  return {
    candidates,
    rankedCandidates,
  }
});

export default useCandidateStore;
