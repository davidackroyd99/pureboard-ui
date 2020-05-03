<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">PureBoard</a>

        <ul class="navbar-collapse navbar-nav">
            <a class="nav-item nav-link active" href="#">Hot</a>
            <a class="nav-item nav-link" href="#">New</a>
            <a class="nav-item nav-link" href="#">Controversial</a>
        </ul>

        <form v-if="auth_level == 0 && !register" class="form-inline">
            <input class="form-control mr-sm-2" v-model="username" type="text" placeholder="username" aria-label="username">
            <input class="form-control mr-sm-2" v-model="password" type="password" placeholder="password" aria-label="password">
            <button class="btn btn-outline-success my-2 my-sm-0" @click="login" type="submit">Login</button>
        </form>

        <form v-if="auth_level == 0 && register" class="form-inline">
            <input class="form-control mr-sm-2" type="text" placeholder="email" aria-label="email">
            <input class="form-control mr-sm-2" type="text" placeholder="username" aria-label="username">
            <input class="form-control mr-sm-2" type="password" placeholder="password" aria-label="password">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
        </form>

        <a href="#" class="pl-2" @click="toggle_register" v-if="auth_level == 0">Register</a>

        <div v-if="auth_level != 0">
            You are logged in.
        </div>

    </nav>
</template>

<script>

import axios from 'axios'

export default {
    name: 'navbar',

    props: ['auth_level'],

    data() {
        return {
            register: false,
            email: '',
            username: '',
            password: '',
        }
    },

    methods: {
        toggle_register() {
            this.register = !this.register;
        },

        async login() {
            var mutation = `mutation { 
                tokenAuth(username: "${ this.username }", password: "${ this.password }") {
                    token
                } 
            }`;
            const res = await axios.post('http://localhost:8000/graphql/', { query: mutation });

            var token = res.data.data.tokenAuth.token;

            this.$emit('token-received', token);
        }
    },
}

</script>