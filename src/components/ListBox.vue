<template>
    <div class="text-right">
        <label class="mr-7">{{ label }}</label>
        <select v-model="selectedOption" class="border-2 w-[250px] mb-3" @change="emitValue">
            <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
    </div>
</template>

<script setup>
import { onUpdated, ref } from 'vue';

const props = defineProps({
    label: String,
    options: Array
});

const emit = defineEmits(['select']);

const selectedOption = ref(props.options[0]);

const emitValue = () => {
    emit('select', selectedOption.value);
};
</script>
