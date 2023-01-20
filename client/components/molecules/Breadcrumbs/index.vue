<script setup lang="ts">
    export interface Crumb {
        number: number;
        text: string;
    }
    const props = defineProps<{
        crumbs: Array<Crumb>,
        activeCrumb: number;
    }>();

    const crumbs = reactive<Array<Crumb>>(props.crumbs);
    const activeCrumb = ref<number>(props.activeCrumb);
</script>


<template lang="">
    <ul class="flex">
        <AtomsBreadcrumb 
        v-for="crumb, index in crumbs"
        :isActive="activeCrumb === crumb.number" 
        :number="crumb.number"
        >{{crumb.text}}</AtomsBreadcrumb>
    </ul>
</template>
<script lang="ts">
import { AtomsBreadcrumb } from '#components';
export default defineComponent({
    name: 'BreadCrumbs'
})
</script>
