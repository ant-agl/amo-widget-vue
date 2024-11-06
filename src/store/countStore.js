import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountStore = defineStore("count", () => {
  const count = ref(0);

  const countInc = () => {
    count.value++;
  };
  const countDec = () => {
    count.value--;
  };

  return {
    count,
    countInc,
    countDec,
  };
});
