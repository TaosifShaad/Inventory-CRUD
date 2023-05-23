<template>
    <div>
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" class="relative z-10">
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
                                class="w-full max-w-[505px] pr-[30px] rounded-none transform overflow-hidden rounded-2xl bg-[#F7F7FA] p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 text-center mb-7 ml-10">
                                    {{ mode == 'edit' ? 'Edit Product' : 'Add New Product' }} <button class="float-right" @click="closeModal"><XMarkIcon class="h-6 w-6 text-gray-500" /></button>
                                </DialogTitle>
                                <div class="mt-2">
                                    <ListBox label="Category" :options="categories" @select="selectCategory"></ListBox>
                                    <ListBox label="Product Name" :options="products" @select="selectProductName"></ListBox>
                                    <InputField title="Serial Number" placeholder="Enter Serial Number" @select="selectSl">
                                    </InputField>
                                    <InputField title="Purchase Price" placeholder="Enter Price" @select="selectPrice">
                                    </InputField>
                                    <InputField title="Purchase Date" inputType="date" @select="selectPurchaseDate">
                                    </InputField>

                                    <div class="text-center">
                                        <input class="mr-2" type="checkbox" id="jack" value="Jack" v-model="checkedNames">
                                        <label for="jack">Has Warranty</label>
                                    </div>

                                    <div v-if="checkedNames" class="mt-2">
                                        <ListBox label="Warranty" :options="state.options" @select="selectWarranty">
                                        </ListBox>
                                        <InputField title="Warranty Expire Date" inputType="date"
                                            @select="selectExpireDate"></InputField>
                                    </div>
                                </div>

                                <div class="mt-4 text-right">
                                    <button class="mr-2 py-[5px] px-4 border-2 border-red-500 rounded-sm text-red-500 font-medium" @click="closeModal">Cancel</button>
                                    <button type="button"
                                        class="inline-flex justify-center rounded-sm border border-transparent bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        @click="addData">
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
import { ref, reactive, computed, onUpdated } from 'vue';
import InputField from '@/components/InputField.vue';
import ListBox from '@/components/ListBox.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

const props = defineProps({
    rowData: Object,
    isOpen: Boolean,
    mode: String
});

const emit = defineEmits(['closeModal', 'openModal', 'reFetchData']);

onUpdated(() => {
    if (props.mode == 'edit') {
        product.categoryName = props.rowData.categoryName;
        product.productName = props.rowData.productName;
        product.serialNumber = props.rowData.serialNumber;
        product.purchasePrice = props.rowData.purchasePrice;
        product.purchaseDate = props.rowData.purchaseDate;
        product.warrantyInYears = props.rowData.warrantyInYears;
        product.warrantyExpireDate = props.rowData.warrantyExpireDate;
        console.log(props.rowData.serialNumber, 'pppp');
    }
});

const checkedNames = ref(false);
const state = reactive({
    options: [
        1,
        2
    ]
});
const categories = [];
const productName = [];
let categoryResponse;

const product = reactive({
    categoryName: '',
    productName: '',
    serialNumber: '',
    purchasePrice: '',
    purchaseDate: '',
    warrantyInYears: '',
    warrantyExpireDate: ''
});

const getCategory = async () => {
    try {
        const apiKey = 'IRyKCBuGQ1PpflCBs7ZaU+KImwTULz1fU8zjWE/aKhU=';
        const url = 'http://182.163.101.173:49029/product-crud/products/category-name-wise-product-names';
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

const postData = async () => {
    const jsonBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
    const formData = new FormData();
    formData.append('product', jsonBlob, 'product.json');
    try {
        const apiKey = 'IRyKCBuGQ1PpflCBs7ZaU+KImwTULz1fU8zjWE/aKhU=';
        const url = 'http://182.163.101.173:49029/product-crud/products';
        const response = await axios.post(url, formData, {
            headers: {
                'apiKey': apiKey,
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            }
        });
        emit('reFetchData');
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Product Added'
        })
    } catch (error) {
        console.log(error);
    }
};

const products = computed(() => {
    let productArr = [];
    categoryResponse.forEach(element => {
        if (element.name == product.categoryName) {
            element.products.forEach(elem => {
                productArr.push(elem.name);
            })
        }
    })
    return productArr;
})

function closeModal() {
    emit('closeModal');
}
function openModal() {
    isOpen.value = true
}

const selectWarranty = (warranty) => {
    product.warrantyInYears = warranty;
};

const selectCategory = (category) => {
    product.categoryName = category;
};

const selectProductName = (selectedProduct) => {
    product.productName = selectedProduct;
}

const selectSl = (sl) => {
    product.serialNumber = sl;
}

const selectPrice = (price) => {
    product.purchasePrice = price;
};

const selectPurchaseDate = (date) => {
    product.purchaseDate = date;
};

const selectExpireDate = (date) => {
    product.warrantyExpireDate = date;
};

const addData = () => {
    closeModal();
    postData();
};
</script>
