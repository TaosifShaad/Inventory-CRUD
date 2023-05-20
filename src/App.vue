<template>
  <header>
    <div class="wrapper">
      <!-- <nav>
        <RouterLink to="/add">Add</RouterLink>
      </nav> -->
      <AddValue />
    </div>
  </header>
  <h1 class="text-3xl font-bold underline text-red-400">
    Hello world!
  </h1>

  <!-- <RouterView /> -->
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { provide } from "vue";
import AddValue from "@/views/AddValue.vue";

let test = ref(false);
provide('test', test.value);
</script>

<style scoped>

</style>
