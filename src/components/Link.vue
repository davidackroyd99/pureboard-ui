<template>
    <div class="background bg-secondary">
        <div class="card d-flex flex-row bg-dark">
            <div class="py-3 px-1 d-flex flex-column">
                <VoteArrow @new_score="do_vote" :score=1 />
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