<template>
  <header>
    <div class="wrapper">
      <!-- <nav>
        <RouterLink to="/add">Add</RouterLink>
      </nav> -->
      <AddValue />
    </div>
  </header>
  <Table />

  <!-- <RouterView /> -->
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { provide } from "vue";
import AddValue from "@/views/AddValue.vue";
import Table from "@/components/Table.vue";

let test = ref(false);
provide('test', test.value);
</script>

<style scoped>

</style>
