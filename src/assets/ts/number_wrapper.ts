import { ref, computed, type Ref, type WritableComputedRef } from 'vue';

export { number_wrapper };
export type { NumberWrapper };

type NumberWrapper = WritableComputedRef<string>;

type Parser = (_str: string) => number;

function number_wrapper(number: Ref<number>, parser: Parser = parseInt): NumberWrapper {
  const isValid = ref(true);
  const wrapper: WritableComputedRef<string> = computed({
    get() {
      return number.value.toString();
    },
    set(n: string) {
      const num = parser(n);
      if (Number.isFinite(num)) {
        number.value = num;
        isValid.value = true;
      } else {
        isValid.value = false;
      }
    }
  });

  return wrapper;
}
