<template>
    <div id="all">
        <img class="feather" src="@/assets/76-768982_file-beige-feather-svg-feather-cartoon-black-and-white-removebg-preview.png" alt="">
        <div class="items">
            <li v-for="item in state.items"> {{ item }} </li>
        </div>
        <create :title="state.title" @submit="add"></create>
    </div> 
</template>


<script setup>
    import create from '@/components/create.vue';
    import { reactive, onMounted } from 'vue';
    import { inject } from 'vue';
    const state = reactive({
        title: 'Add Items:',
        items: [
            'item 1',
            'item 2',
            'item 3'
        ]
    })
    function add(e) {
        console.log(e)
        state.items.push(e);
    }
    onMounted(() => {
        console.log('onmounted')
    })
    let test = inject('test');
    console.log('testing-----' + test);
</script>


<style scoped>
    #all {
        border-radius: 64px;
        background: #ffffff;
        box-shadow: 0px 0px 11px #878787, -19px 19px 38px #ffffff;
        width: 45%;
        height: 99%;
        padding: 35px;
        margin-left: 200px;
        position: relative;
    }
    .items {
        list-style: none;
        border: 1px solid;
        max-width: 96%;
        text-align: center;
        border-radius: 17px;
        box-shadow: 0px 0px 6px 5px navajowhite;
    }
    li {
        border-bottom: 1px solid;
        border-radius: 20px;
    }
    .feather {
        width: 200px;
        position: absolute;
        transform: rotate(-45deg);
        right: -78px;
        top: -40px;
        z-index: 1;
        right: -81px;
    }
</style>