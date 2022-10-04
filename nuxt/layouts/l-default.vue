<template lang="">
    <div>
        <VStatusBar/>
        
        <nuxt/>
        <Footer
            class="mt-3"
        />
    </div>
</template>
<script>
import VStatusBar from "@/components/navigation/V-StatusBar.vue";
import Footer from "@/components/sections/V-Footer.vue";

export default {
    components: {
        VStatusBar,
        Footer,
        
    }
}
</script>
<style lang="">
    
</style>