<template>
    <section class="_404 d-flex justify-center align-center fullwidth fullheight">
        <div class="center">
            <div class="title text-center">404</div>
            <div class="paragraph status-page__message">Page with this url does not exist</div>
            <div class="d-flex justify-center">
                <router-link to="/mazeratti" class="btn">Sign in</router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import  {defineComponent } from "vue";
    export default defineComponent({
        name: '404View'
    });
</script>