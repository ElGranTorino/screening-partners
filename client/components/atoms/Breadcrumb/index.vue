<script setup lang="ts">
    let props = withDefaults(defineProps<{
        isActive?: boolean;
        number?: number;
    }>(),{
        isActive: false,
        number: 1
    })


    const isActive = ref<boolean>(props.isActive);
    const number = ref<number>(props.number);
</script>



<template>
    <li class="flex items-center justify-end v-breadcrumb">
        <span 
            class="circle bg-gray-400 text-white font-semibold rounded-full w-8 h-8 flex text-sm items-center justify-center mr-2"
            :class="[isActive ? 'bg-blue-700' : 'bg-gray-400']"
        >{{ number }}</span>
        <span 
            class="font-bold tracking-wide text-sm font-montserrat "
            :class="[!isActive ? 'text-gray-400' : '']"
        >
            <slot></slot>
        </span>
    </li>
</template>

<script lang="ts">
    export default defineComponent({
        name: 'BreadCrumb'
    })
</script>


<style>
.v-breadcrumb:not(:last-of-type)::after {
    content: '';
    margin-left: 1rem;
    display: inline-block;
    width: 20px;
    height: 2px;
    background: silver;
}
.v-breadcrumb:not(:first-of-type) {
    margin-left: 1rem;
}
</style>