<template>
    <div id="app">
        <Nav></Nav>

    </div>
</template>

<script>

// import axios from 'axios'
import Nav from './components/Nav.vue'

export default {
    name: 'app',

    data() {
        return {
            username: "Anonymous",
            mode: 0
        }
    },

    components: {
        Nav
    },

    methods: {
        
    },
}

</script>