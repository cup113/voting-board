import { defineStore } from 'pinia';
import type { ComputedRef, Ref } from 'vue';
import { ref, computed, watch } from 'vue';

const useStore = defineStore("index", () => {
  const
    subject: Ref<string> = ref("hello"),
    docTitle: ComputedRef<string> = computed(() => `${subject.value} - 计票器`)
    ;
  watch(docTitle, (v) => {
    document.title = v;
  }, { immediate: true });

  return {
    subject,
    history,
  };
});

export default useStore;
