<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2 style="color:coral"> {{ user.name }} </h2>
  </div>
</template>

<script setup>
  import {watch} from 'vue';
  import { useRoute } from 'vue-router';
  import { user } from '@/stores/userStore';
  const route = useRoute();
  console.log(route.fullPath);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
