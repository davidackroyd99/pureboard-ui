<template>
    <div id="app">
        <Nav :auth_level="this.auth_level" @token-received="setToken"/>
        
        <div class="links">
            <div class="link" v-for="link in links" :key="link.id">
                <Link :link="link" />
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

        setToken(token) {
            this.auth_level = 1;
            this.token = token;
        },
    },

    mounted() {
        this.getLinks(`{
            links 
            {
                id url description
                postedBy {
                    username

                    profile {
                        karma
                    }
                }
                votes {
                    score
                }
            }
        }`);
    },
}

</script>