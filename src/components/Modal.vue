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
                                <DialogTitle as="h3"
                                    class="text-lg font-medium leading-6 text-gray-900 text-center mb-7 ml-10">
                                    {{ mode == 'edit' ? 'Edit Product' : 'Add New Product' }} <button class="float-right"
                                        @click="closeModal">
                                        <XMarkIcon class="h-6 w-6 text-gray-500" />
                                    </button>
                                </DialogTitle>
                                <form @submit.prevent="addData(productId)">
                                    <div class="mt-2">
                                        <div class="text-right">
                                            <label for="category" class="mr-7">Category</label>
                                            <select id="category" v-model="product.categoryName"
                                                class="border-2 w-[250px] mb-3">
                                                <option v-for="option in categories" :key="option">{{ option }}</option>
                                            </select>
                                        </div>
                                        <div class="text-right">
                                            <label for="product-name" class="mr-7">Product Name</label>
                                            <select id="product-name" v-model="product.productName"
                                                class="border-2 w-[250px] mb-3">
                                                <option v-for="option in products" :key="option">{{ option }}</option>
                                            </select>
                                        </div>

                                        <div class="text-right">
                                            <label for="serial" class="mr-7">Serial Number</label>
                                            <input required type="text" id="serial" placeholder="Enter Serial Number"
                                                class="px-2 border-2 w-[250px] mb-3" v-model="product.serialNumber" />
                                        </div>

                                        <div class="text-right">
                                            <label for="price" class="mr-7">Purchase Price</label>
                                            <input required type="text" id="price" placeholder="Enter price"
                                                class="px-2 border-2 w-[250px] mb-3" v-model="product.purchasePrice" />
                                        </div>

                                        <div class="text-right">
                                            <label for="purchase-date" class="mr-7">Purchase Date</label>
                                            <input required type="date" id="purchase-date"
                                                class="px-2 border-2 w-[250px] mb-3" v-model="product.purchaseDate" />
                                        </div>

                                        <div class="text-center">
                                            <input class="mr-2" type="checkbox" id="warranty-check"
                                                v-model="checkedWarranty" @change="clearWarranty">
                                            <label for="warranty-check">Has Warranty</label>
                                        </div>

                                        <div v-if="checkedWarranty" class="mt-2">
                                            <div class="text-right">
                                                <label for="warranty" class="mr-7">Warranty</label>
                                                <select id="warranty" v-model="product.warrantyInYears"
                                                    class="border-2 w-[250px] mb-3">
                                                    <option v-for="option in state.options" :key="option">{{ option }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="text-right">
                                                <label for="expire-date" class="mr-7">Warranty Expire Date</label>
                                                <input required type="date" id="expire-date"
                                                    class="px-2 border-2 w-[250px] mb-3"
                                                    v-model="product.warrantyExpireDate" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-4 text-right flex justify-end gap-1">
                                        <div class="mr-2 py-[5px] px-4 border-2 border-red-500 rounded-sm text-red-500 font-medium cursor-pointer hover:text-red-400 hover:border-red-300"
                                            @click="closeModal">Cancel</div>
                                        <button type="submit"
                                            class="inline-flex justify-center rounded-sm border border-transparent bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onUpdated, onMounted } from 'vue';
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
});

onUpdated(() => {
    if (props.mode == 'edit') {
        product.categoryName = props.rowData.categoryName;
        product.productName = props.rowData.productName;
        product.serialNumber = props.rowData.serialNumber;
        product.purchasePrice = props.rowData.purchasePrice;
        product.purchaseDate = props.rowData.purchaseDate;
        product.warrantyInYears = props.rowData.warrantyInYears;
        product.warrantyExpireDate = props.rowData.warrantyExpireDate;
        productId.value = props.rowData.id;
        if (product.warrantyInYears) {
            checkedWarranty.value = true;
        } else {
            checkedWarranty.value = false;
        }
    } else {
        product.categoryName = categories[0];
        product.productName = products.value[0];
        product.serialNumber = '';
        product.purchasePrice = '';
        product.purchaseDate = '';
        product.warrantyInYears = '';
        product.warrantyExpireDate = '';
        productId.value = -1;
    }
});

const checkedWarranty = ref(false);
const productId = ref(-1);
const state = reactive({
    options: [
        1,
        2,
        3,
        4,
        5
    ]
});
const categories = [];
const productName = [];
let categoryResponse;

const product = reactive({
    categoryName: categories[0],
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
        Toast.fire({
            icon: 'error',
            title: error.message
        });
    }
};

onMounted(() => {
    getCategory();
})

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
        Toast.fire({
            icon: 'success',
            title: 'Product Added'
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error.message
        })
    }
};

const updateData = async (id) => {
    try {
        const apiKey = 'IRyKCBuGQ1PpflCBs7ZaU+KImwTULz1fU8zjWE/aKhU=';
        const url = `http://182.163.101.173:49029/product-crud/products/${id}`;
        const response = await axios.put(url, { ...product, id }, {
            headers: {
                'apiKey': apiKey,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        emit('reFetchData');

        Toast.fire({
            icon: 'success',
            title: 'Product Updated'
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error.message
        });
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

const clearWarranty = () => {
    if (!checkedWarranty.value) {
        console.log('uncheck')
        product.warrantyInYears = '';
        product.warrantyExpireDate = '';
    }
}

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

const addData = (id) => {
    closeModal();
    if (id === -1) {
        postData();
    } else {
        updateData(id);
    }
};
</script>
