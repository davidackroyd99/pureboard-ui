<template>
<div>
    <b-button v-b-modal.submit-link-modal class="btn btn-outline-success my-2 my-sm-0 mr-5" type="submit">Submit Link</b-button>


    <b-modal id="submit-link-modal" ok-title="Submit" @ok="submitLink" title="Submit Link">

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

            console.log(mutation);

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

<style scoped>

</style>