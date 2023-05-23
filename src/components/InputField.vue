<template>
    <div class="text-right">
        <label for="Category" class="mr-7">{{ title }}</label>
        <input required :type="inputType" id="Category" :placeholder="placeholder" class="px-2 border-2 w-[250px] mb-3" v-model="selected" @input="emitValue" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    title: String,
    placeholder: String,
    inputType: {
        type: String,
        default: 'text'
    }
});

const emit = defineEmits(['select']);

const selected = ref();

const emitValue = () => {
    emit('select', selected.value);
}
</script>
