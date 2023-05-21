<template>
  <Navbar />
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/add">Add</RouterLink>
      </nav>
      <AddValue />
    </div>
  </header> -->
  <Table />
  <Modal />
  <!-- <RouterView /> -->
</template>

<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { provide } from 'vue';
import AddValue from '@/views/AddValue.vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

let test = ref(false);
provide('test', test.value);

</script>

<style scoped>

</style>
