<template>
    <div>
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
                                <tr
                                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 bg-[#FAFAFA]">
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                    <td class="whitespace-nowrap px-6 py-4">Mark</td>
                                    <td class="whitespace-nowrap px-6 py-4">Otto</td>
                                    <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                                </tr>
                                <tr
                                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 bg-gray-500">
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                    <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                                    <td class="whitespace-nowrap px-6 py-4">Thornton</td>
                                    <td class="whitespace-nowrap px-6 py-4">@fat</td>
                                </tr>
                                <tr
                                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                    <td class="whitespace-nowrap px-6 py-4">Larry</td>
                                    <td class="whitespace-nowrap px-6 py-4">Wild</td>
                                    <td class="whitespace-nowrap px-6 py-4">@twitter</td>
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
</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 15px;
}
</style>