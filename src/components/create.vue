<template>
    <div>
        <hr style="color: grey; margin-top:25px; width: 110%; margin-left: -10px">
        <h1>{{ title }}</h1>
        <form @submit.prevent="add">
            <input type="text" v-model="state.addInput">
            <button type="submit">+</button>
        </form>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import sAlert from 'sweetalert';
    const state = reactive({
        addInput: ''
    });
    const props = defineProps({
        title: String
    })
    const emit = defineEmits(['submit'])
    function add() {
        emit('submit', state.addInput)
        sAlert('Success', 'Added Item!', 'success')
        state.addInput = ''
    }
</script>

<style scoped>
    input {
        width: 171px;
        border-top-left-radius: 11px;
        border-bottom-left-radius: 11px;
        border-right: none;
        margin-right: 8px;
        padding: 3px 9px;
    }
    button {
        background: navajowhite;
        border-radius: 50%;
    }
    h1 {
        font-family: 'Rubik Vinyl', cursive;
        font-size: 29px;
        text-align: center;
        color: darkred;
    }
</style>