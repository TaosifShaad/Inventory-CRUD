<template>
    <div class="text-right">
        <label for="Category" class="mr-7">{{ title }}</label>
        <input type="text" id="Category" :placeholder="placeholder" class="border-2 w-[250px] mb-3" />
    </div>
</template>

<script setup>
defineProps({
    title: String,
    placeholder: String
})
</script>
