<template lang="">
    <footer class="v-footer max-w-4xl mx-auto mt-40">
        <div class="flex justify-between items-center">
            <span class="copyright font-montserrat font-semibold text-sm tracking-wider text-gray-700">
               &copy; {{currentYear}} All rights reserved
            </span>
            <span class="search-count text-sm font-montserrat tracking-wider text-gray-700">
                <b>1k</b> searches performed
            </span>
        </div>
    </footer>
</template>
<script lang="ts">
    export default defineComponent({
        name: 'Footer'
    })
</script>
<script setup lang="ts">
    const date = new Date();
    const currentYear = date.getFullYear();
</script>
