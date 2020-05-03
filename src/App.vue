<template>
    <div id="app">
        <Nav />
        
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
            username: "Anonymous",
            mode: 0,
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
            console.log(this.links);
        }
    },

    mounted() {
        this.getLinks(`{
            links {id url description}
        }`);
    },
}

</script>