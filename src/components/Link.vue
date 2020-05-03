<template>
    <div class="card d-flex flex-row">
        <div class="pl-2 pr-2 d-flex flex-column">
            <a>▲</a>
            <a>▼</a>
        </div>

        <div class="p-2 d-flex flex-column">
            <Score :link="link" />
        </div>

        <div class="card-body">
            <a class="card-link" target="_blank" :href="link.url">{{ link.description }}</a>
            <p>Submitted by <UserSummary :user="link.postedBy" /></p>
        </div>
    </div>
</template>

<script>

import Score from './Score';
import UserSummary from './UserSummary';

export default {
    name: 'link-display',

    props: ['link'],

    data() {
        return {
        }
    },

    components: {
        Score,
        UserSummary
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
</style>