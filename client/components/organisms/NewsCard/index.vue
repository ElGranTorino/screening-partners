<template>
    <div class="border-black rounded-md shadow-2xl shadow-slate-200 p-6">
        <div class="date font-semibold tracking-wider text-gray-600">
            {{ date }}
        </div>
        <div class="title text-lg font-bold tracking-wide text-slate-800 mt-6" >
            {{ title }}
        </div>
        <div class="body font-light text-gray-400 tracking-wide mt-10 italic leading-7">
            {{ body }}
        </div>
        <div class="source">
            <a 
                class="btn bg-blue-800 mt-4" 
                target="_blank"
                :href="source"
            >Source</a>
        </div>
    </div>
</template>
<script setup lang="ts">
export interface News {
    date: string;
    title: string;
    body: string;
    source: string;
}
const {date, title, body, source} = defineProps<News>();
</script>

<script lang="ts">
export default defineComponent({
    name: 'NewsCard'
})
</script>
