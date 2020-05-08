<template>
    <div class="card d-flex flex-row">
        <div class="pl-2 pr-2 d-flex flex-column">
            <VoteArrow @new_score="do_vote" :score=1 />
            <VoteArrow @new_score="do_vote" :score=-1 />
        </div>

        <div class="p-2 d-flex flex-column">
            <Score :votes="link.votes" />
        </div>

        <div class="card-body">
            <a class="card-link" target="_blank" :href="link.url">{{ link.description }}</a>
            <p>Submitted by <UserSummary :user="link.postedBy" /></p>
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

    props: ['link', 'token', 'auth_level'],

    data() {
        return {
        }
    },

    methods: {
        async do_vote(score) {
            var mutation = `
            mutation { 
                createVote(linkId: ${ this.link.id }, score: ${ score }) {
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
        }
    },

    components: {
        Score,
        UserSummary,
        VoteArrow
    },
}

</script>

<style scoped>
    p {
        margin: 0px;
    }

    .card-body {
        padding: 0px;
    }  

    a:hover {
        text-decoration: none;
    }
</style>