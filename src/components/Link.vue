<template>
    <div class="background bg-secondary">
        <div class="card d-flex flex-row bg-dark">
            <div class="py-3 px-1 d-flex flex-column">
                <VoteArrow v-if="show_arrow()" @on_vote="do_vote" />
            </div>

            <div class="py-3 px-1 d-flex flex-column">
                <Score :votes="link.votes" />
            </div>

            <div class="card-body pl-2">
                <a class="card-link" target="_blank" :href="link.url">{{ link.description }}</a>
                <p>Submitted by <UserSummary :user="link.postedBy" /></p>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

import Score from './Score';
import UserSummary from './UserSummary';
import VoteArrow from './VoteArrow';

export default {
    name: 'link-display',

    props: ['link', 'token', 'auth_level', 'user'],

    data() {
        return {
        }
    },

    methods: {
        async do_vote() {
            console.log("do vote");

            var mutation = `
            mutation { 
                createVote(linkId: ${ this.link.id }) {
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
        },

        show_arrow() {
            for(var i = 0; i < this.link.votes.length; i++) {
                if(this.link.votes[i].user.id == this.user.id) {
                    return false;
                }
            }

            return true;
        }
    },

    components: {
        UserSummary,
        VoteArrow,
        Score
    },
}

</script>

<style scoped>
    p {
        margin: 0px;
    }

    a {
        font-size: 20px;
    }

    .background {
        overflow: auto;
    }

    .card-body {
        padding: 0px;
    }  

    .card {
        border-radius: 5px;
        border: none;
        margin: 0.5rem 1rem;
        padding: 0.25rem;
    }

    a:hover {
        text-decoration: none;
    }
</style>