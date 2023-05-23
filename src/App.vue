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
  <Table @editData="sendToModal" />
  <Modal :rowData="rowData" :isOpen="isOpen" @closeModal="closeModal"></Modal>
  <button @click="openModal">clvvick</button>
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

const rowData = ref();
const isOpen = ref(false);

function openModal() {
    isOpen.value = true;
}

function closeModal() {
    isOpen.value = false
}

const sendToModal = (data) => {
  rowData.value = data;
};

let test = ref(false);
provide('test', test.value);

</script>

<style scoped>

</style>
