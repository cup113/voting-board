import { defineStore } from 'pinia';
import { reactive, computed, type ComputedRef } from 'vue';

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
}

const useCandidateStore = defineStore("candidate", () => {
  const
    candidates: Map<string, Candidate> = reactive(new Map([
      ["1", new Candidate("张三", "1")],
      ["2", new Candidate("李四", "2")]
    ])),
    rankedCandidates: ComputedRef<Candidate[]> = computed(() => {
      var result = Array.from(candidates.values());
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
