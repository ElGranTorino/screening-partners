<template>
    <section class="_404 d-flex justify-center align-center fullwidth fullheight">
        <div class="center">
            <div class="title text-center">403</div>
            <div class="paragraph status-page__message">You don`t have enough rights to visit this page</div>
            <div class="d-flex justify-center">
                <router-link to="/london" class="btn">Sign in</router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import  {defineComponent } from "vue";

    export default defineComponent({
        name: '403View'
    });
</script>