<template>
    <div class="text-right">
        <label class="mr-7">{{ label }}</label>
        <select v-model="selectedOption" class="border-2 w-[250px] mb-3" @change="emitValue">
            <option v-for="option in state.options" :key="option">{{ option }}</option>
        </select>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

defineProps({
    label: String
});

const emit = defineEmits(['select']);

const state = reactive({
    options: [
        'option a',
        'option b'
    ]
});
const selectedOption = ref(state.options[0]);

const emitValue = () => {
    emit('select', selectedOption.value);
};
</script>
