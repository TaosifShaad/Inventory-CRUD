<template>
  <Navbar />
  <div class="flex items-center">
    <button class="bg-[#045692] text-white p-3 ml-9 mt-5" @click="openModal();modalMode = 'add'">Add Inventory</button>
    <searchBar class="ml-auto mr-8" />
  </div>
  <Table :reFetchData="fetchData" @editData="sendToModal"></Table>
  <Modal :rowData="rowData" :mode="modalMode" :isOpen="isOpen" @closeModal="closeModal" @openModal="openModal"
    @reFetchData="reFetchData"></Modal>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { provide } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

const rowData = ref();
const isOpen = ref(false);
const modalMode = ref();
const fetchData = ref(false);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false
}

const sendToModal = (data) => {
  modalMode.value = 'edit';
  rowData.value = data;
  openModal();
};

const reFetchData = () => {
  fetchData.value = !fetchData.value;
};

let test = ref(false);
provide('test', test.value);

</script>

<style scoped></style>
