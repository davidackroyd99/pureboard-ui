<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <a class="navbar-brand" href="#">PureBoard</a>

        <ul class="navbar-collapse navbar-nav">
            <!-- <a class="nav-item nav-link active" href="#">Hot</a>
            <a class="nav-item nav-link" href="#">New</a>
            <a class="nav-item nav-link" href="#">Controversial</a> -->
        </ul>

        <SubmitLink v-if="auth_level != 0" :token="this.token" @get-links="getLinks"/>

        <form v-if="auth_level == 0 && !register" class="form-inline">
            <input class="form-control mr-sm-2" v-model="username" type="text" placeholder="username" aria-label="username">
            <input class="form-control mr-sm-2" v-model="password" type="password" placeholder="password" aria-label="password">
            <b-button variant="outline-primary" class="my-2 my-sm-0 mr-5" @click="login" type="submit">Login</b-button>
        </form>

        <form v-if="auth_level == 0 && register" class="form-inline">
            <input class="form-control mr-sm-2" v-model="email" type="text" placeholder="email" aria-label="email">
            <input class="form-control mr-sm-2" v-model="username" type="text" placeholder="username" aria-label="username">
            <input class="form-control mr-sm-2" v-model="password" type="password" placeholder="password" aria-label="password">
            <b-button variant="outline-primary" class="my-2 my-sm-0 mr-5" @click="doRegister" type="submit">Register</b-button>
        </form>

        <a href="#" class="switch-anchor pl-2" @click="toggle_register" v-if="auth_level == 0 && !register">Register</a>
        <a href="#" class="switch-anchor pl-2" @click="toggle_register" v-if="auth_level == 0 && register">Login</a>

        <div v-if="auth_level != 0" >
            <p>You are logged in.</p> <a href="#" @click="logout">Logout</a>
        </div>

    </nav>
</template>

<script>

import axios from 'axios'

import SubmitLink from './SubmitLink';

export default {
    name: 'navbar',

    props: ['auth_level', 'token'],

    components: {
        SubmitLink
    },

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
        },

        async doRegister() {
            var mutation = `mutation { 
                createUser(username: "${ this.username }", password: "${ this.password }", email: "${ this.email }") {
                    user {
                        username
                    }
                } 
            }`;

            const res = await axios.post('http://localhost:8000/graphql/', { query: mutation });

            if(res.status == 200) {
                this.register = false;
            }
        },

        getLinks() {
            this.$emit("get-links", `{
                links 
                {
                    id url description
                    postedBy {
                        username
                        karma
                    }
                    votes {
                        user {
                            id
                        }
                    }
                }
            }`);
        },

        logout() {
            this.$emit('logout');
        }
    },
}

</script>

<style scoped>
nav {
    margin-bottom: 0.5rem;
}

.navbar-brand {
    font-size: 28px;
}

.switch-anchor {
    width: 60px;
    text-align: center;
}

button {
    width: 108px;
}

p {
    display: inline;
    color: white;
}
</style>