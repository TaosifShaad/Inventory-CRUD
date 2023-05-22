<template>
    <div>
        <button @click="openModal">click</button>
        <!-- <div class="fixed inset-0 flex items-center justify-center">
        <button type="button" @click="openModal"
            class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Open dialog
        </button>
    </div> -->
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-10">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                    leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-[505px] pr-[30px] rounded-none transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 text-center mb-7">
                                    Add New Product
                                </DialogTitle>
                                <div class="mt-2">
                                    <ListBox label="Category" :options="categories" @select="selectCategory"></ListBox>
                                    <ListBox label="Product Name" :options="selectedCategory? products: ['Select Category first']" @select="selectValue"></ListBox>
                                    <InputField title="Serial Number" placeholder="Computer"></InputField>
                                    <InputField title="Purchase Price" placeholder="Computer"></InputField>
                                    <InputField title="Purchase Date" placeholder="Computer"></InputField>

                                    <div class="text-center">
                                        <input class="mr-2" type="checkbox" id="jack" value="Jack" v-model="checkedNames">
                                        <label for="jack">Has Warranty</label>
                                    </div>

                                    <div v-if="checkedNames">
                                        <ListBox label="Warranty" :options="state.options" @select="selectValue"></ListBox>
                                        <InputField title="Warranty Expire Date"></InputField>
                                    </div>
                                </div>

                                <div class="mt-4 text-right">
                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        @click="closeModal">
                                        Save
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import InputField from '@/components/InputField.vue';
import ListBox from '@/components/ListBox.vue';
import axios from 'axios';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false);
const checkedNames = ref(false);
const state = reactive({
    options: [
        'option a',
        'option b'
    ]
});
const categories = [];
const productName = [];
let selectedCategory = ref();
let categoryResponse;

const getCategory = async () => {
    try {
        const apiKey = 'IRyKCBuGQ1PpflCBs7ZaU+KImwTULz1fU8zjWE/aKhU='; // Replace with your actual API key
        const url = 'http://182.163.101.173:49029/product-crud/products/category-name-wise-product-names'; // Replace with your API endpoint URL
        const response = await axios.get(url, {
            headers: {
                'apiKey': apiKey
            }
        });
        categoryResponse = response.data;
        response.data.forEach(category => {
            categories.push(category.name);
            productName[category.name] = category.products;
        });
    } catch (error) {
        console.error(error);
    }
};

getCategory();

const products = computed(() => {
    let productArr = [];
    categoryResponse.forEach(element => {
        if (element.name == selectedCategory.value) {
            element.products.forEach(elem => {
                productArr.push(elem.name);
            })
        }
    })
    return productArr;
})

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

const selectValue = (value) => {
    selected = value;
};

const selectCategory = (category) => {
    selectedCategory.value = category;
    console.log('lskdfj', productName[selectedCategory.value]);
};
</script>
