<template>
<div>
    <b-button v-b-modal.submit-link-modal variant="outline-primary" class="my-2 my-sm-0 mr-5" type="submit">Submit Link</b-button>


    <b-modal id="submit-link-modal" 
    ok-title="Submit" title="Submit Link" ok-class="btn btn-outline-success"
    header-class="bg-secondary text-white b-none"
    footer-class="bg-secondary text-white b-none"
    body-class="bg-dark"
    @ok="submitLink">

        <form class="form">
            <input class="form-control my-2" v-model="newUrl" type="text" placeholder="url" aria-label="url">
            <input class="form-control my-2" v-model="newDescription" type="text" placeholder="description" aria-label="description">
        </form>

    </b-modal>
</div>
</template>

<script>

import axios from 'axios'

export default {
    props: ['token'],

    data: function() {
        return {
            newUrl: "",
            newDescription: "",
        }
    },

    methods: {
        async submitLink() {
            var mutation = `
            mutation { 
                createLink(url: "${ this.newUrl }", description: "${ this.newDescription }",) {
                    link {
                        url
                    }
                }
            }`;

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ this.token }`
            };

            await axios.post('http://localhost:8000/graphql/', { query: mutation }, { headers: headers });

            this.newUrl = "";
            this.newDescription = "";

            this.$emit('get-links');
        }
    },

    components: {

    },
}

</script>

<style>

.b-none {
    border-style: none;
}

</style>