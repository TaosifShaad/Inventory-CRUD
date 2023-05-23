<template>
    <div class="max-w-[1450px] m-auto">
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-left text-sm font-light">
                            <thead class="border-b font-medium dark:border-neutral-500">
                                <tr class="bg-[#CFD5DB]">
                                    <th scope="col" class="px-6 py-4">SL</th>
                                    <th scope="col" class="px-6 py-4">Asset No.</th>
                                    <th scope="col" class="px-6 py-4">Category</th>
                                    <th scope="col" class="px-6 py-4">Image</th>
                                    <th scope="col" class="px-6 py-4">Product Name</th>
                                    <th scope="col" class="px-6 py-4">Serial No.</th>
                                    <th scope="col" class="px-6 py-4">Price</th>
                                    <th scope="col" class="px-6 py-4">Warranty</th>
                                    <th scope="col" class="px-6 py-4">Purchase Date</th>
                                    <th scope="col" class="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products" :key="product.id"
                                    class="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 bg-[#FAFAFA]">
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{{+ + index }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.assetNumber }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.categoryName }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">N/A</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.productName }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.serialNumber }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.purchasePrice }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.warrantyInYears }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ product.purchaseDate }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                        <div class="flex gap-2">
                                            <PencilSquareIcon class="h-6 w-6 text-blue-500" @click="getRowData(product)" />
                                            <TrashIcon class="h-6 w-6 text-red-500" @click="deleteData(product.id)" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onUpdated, ref } from 'vue';
import Swal from 'sweetalert2';
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    reFetchData: Boolean
});

const emit = defineEmits(['editData']);

onUpdated(() => {
    if (props.reFetchData) {
        getTableData();
    }
});

const products = ref();

const getTableData = async () => {
    try {
        const apiKey = 'IRyKCBuGQ1PpflCBs7ZaU+KImwTULz1fU8zjWE/aKhU=';
        const url = 'http://182.163.101.173:49029/product-crud/products';
        const response = await axios.get(url, {
            headers: {
                'apiKey': apiKey
            }
        });
        products.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

getTableData();

const deleteData = async (id) => {
    Swal.fire({
        text: "Are you sure you want to delete this product?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
        if (result.isConfirmed) {
            try {
                const apiKey = 'IRyKCBuGQ1PpflCBs7ZaU+KImwTULz1fU8zjWE/aKhU=';
                const url = `http://182.163.101.173:49029/product-crud/products/${id}`;
                const response = await axios.delete(url, {
                    headers: {
                        'apiKey': apiKey
                    }
                });
                getTableData();
            } catch (error) {
                console.error(error);
            }
        }
    })
};

const getRowData = (rowData) => {
    console.log(rowData);
    emit('editData', rowData);
}

</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 15px;
}
</style>