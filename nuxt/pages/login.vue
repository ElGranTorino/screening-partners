<template lang="">
    <main class="login">
        <div class="login__form">
            <form action="" @submit.prevent="submitForm()">
                <div class="login__form-group">
                    <input type="text" class="text-input" placeholder="Login" v-model="login" required>
                </div>
                <div class="login__form-group mt-1">
                    <input type="password" class="text-input" placeholder="Password" v-model="password" required>
                </div>
                <div class="login__form-group mt-1 text-center">
                    <button class="btn btn--bg-blue" type="submit">Login</button>
                </div>
            </form>
        </div>
    </main>
</template>
<script>
import {mapActions} from  "vuex";
export default {
    name: 'VAdmin',
    layout: 'l-default',
    data(){
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        ...mapActions('api', [
            "authenticate"
        ]),
        submitForm(){
            if(!this.login.length || !this.password.length) return;
            this.authenticate({
                login: this.login,
                password: this.password
            }).then((res) => {
                return this.$router.push({path: '/admin', force: true})
                // window.location.href="http://localhost:3000/admin"
            }).then(() => {
                this.$nuxt.refresh()
            }).catch((err) => {
                alert("wrong passsword")
                throw new Error(err)
            })
        }
    }
}
</script>
<style lang="sass">
@import '@/static/sass/styles.sass'
.login 
    height: 100vh
    position: relative
    &__form 
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
</style>