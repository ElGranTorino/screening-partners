<template>
<section class="login">
    <div class="login__container">
        <div class="login__title title text-center">You want to login?</div>
        <form action="" class="login__form" @submit.prevent="submitForm();">
            <div class="login__form-group">
                <input type="text" class="text-field fullwidth" placeholder="Login" v-model="login">
            </div>
            <div class="login__form-group">
                <input type="password" class="text-field fullwidth" placeholder="Password" v-model="password">
            </div>
            <div class="login__form-group d-flex justify-center">
                <button type="submit" class="btn">Login</button>
            </div>
        </form>

    </div>
  </section>
</template>

<script>
    import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(["authenticate"]),
    submitForm(){
        const login = this.login;
        const password = this.password;
        
        this.authenticate({
            login,
            password
        }).then((data) => {
            this.$router.push({name: 'Admin'})
        }).catch((err) => {
            alert("Wrong password")
        })
    }
  }
  
});
</script>