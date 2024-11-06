<script lang="ts" setup>
import CountTest from "@/components/CountTest.vue";
import { useCountStore } from "@/store/countStore";
import { inject } from "vue";

const countStore = useCountStore();
const wPath = inject("w_path");
</script>

<template>
  <div>
    <h1>App vue {{ countStore.count }}</h1>
    <CountTest msg="AmoCrm test" />

    <div class="row">
      <img :src="wPath + '/assets/img/logo.png'" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: green;
}
.row {
  text-align: center;

  img {
    display: block;
    margin: 0 auto;
  }
}
</style>
