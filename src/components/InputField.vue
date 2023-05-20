<template>
    <div>
        <label for="Category">{{ title }}</label>
        <input type="text" id="Category" :placeholder="placeholder" class="border-2" />
    </div>
</template>

<script setup>
defineProps({
    title: String,
    placeholder: String
})
</script>