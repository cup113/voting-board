import { defineStore } from 'pinia';
import { reactive } from 'vue';
import useVoteStore from './vote';

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
  const voteStore = useVoteStore();

  const
    candidates: Map<string, Candidate> = reactive(new Map([
      ["1", new Candidate("张三", "1")],
      ["2", new Candidate("李四", "2")]
    ]));

  function vote_for_id(id: string) {
    const candidate = candidates.get(id);
    if (candidate === undefined) {
      return; // TODO
    }
    voteStore.vote_for(candidate, true);
  }

  return {
    candidates,
    vote_for_id,
  }
});

export default useCandidateStore;
