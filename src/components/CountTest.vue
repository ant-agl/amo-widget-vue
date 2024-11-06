<script setup>
import { inject, onMounted } from "vue";
import { useCountStore } from "@/store/countStore";

const countStore = useCountStore();

defineProps({
  msg: String,
});

const widget = inject("widget");

onMounted(() => {
  console.log("widget", widget);
  console.log("APP", APP);
});
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      Кол-во {{ countStore.count }}
      <button type="button" @click="countStore.countInc">Добавить</button>
      <button type="button" @click="countStore.countDec">Уменьшить</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  button {
    cursor: pointer;
    border-radius: 4px;
    padding: 5px 10px;
    transition: 0.2s;

    &:hover {
      background-color: #cdd2ff;
    }
  }
}
</style>
