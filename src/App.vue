<template>
    <div id="app" class="text-white">
        <Nav :auth_level="this.auth_level" @get-links="getLinks" :token="this.token" @token-received="setToken" @logout="logout"/>
        
        <div class="links">
            <div class="link" v-for="link in links" :key="link.id">
                <Link :link="link" :token="token" :user="user"/>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import Nav from './components/Nav.vue'
import Link from './components/Link.vue'

export default {
    name: 'app',

    data() {
        return {
            user: undefined,
            auth_level: 0,
            token: '',
            links: [],
        }
    },

    components: {
        Nav, Link
    },

    methods: {
        async getLinks(query) {
            const res = await axios.post('http://localhost:8000/graphql/', { query: query });
            this.links = res.data.data.links;
        },

        async getUserInfo() {
            var query = `
            query { 
                me {
                    id
                    username
                    email
                }
            }`;

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ this.token }`
            };

            const res = await axios.post('http://localhost:8000/graphql/', { query: query }, { headers: headers });
            console.log(res);

            if(res.status == 200) {
                this.user = res.data.data.me;
            }
        },

        setToken(token) {
            localStorage.auth_level = 1;
            localStorage.token = token;

            this.auth_level = 1;
            this.token = token;
        },

        logout() {
            localStorage.auth_level = 0;
            localStorage.token = '';

            this.auth_level = 0;
            this.token = '';
        },
    },

    mounted() {
        this.token = localStorage.token;
        this.auth_level = localStorage.auth_level;

        this.getUserInfo();

        this.getLinks(`{
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
}

</script>

<style>

</style>