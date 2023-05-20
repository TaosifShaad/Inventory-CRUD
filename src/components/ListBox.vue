<template>
    <label>{{ label }}</label>
    <select v-model="selectedOption" class="border-2">
        <option v-for="option in state.options" :key="option" :value="option">{{ option }}</option>
    </select>
</template>

<script setup>
import { reactive } from 'vue';

defineProps({
    label: String
});

const state = reactive({
    options: [
        'option a',
        'option b'
    ]
});
const selectedOption = state.options[0];
</script>
