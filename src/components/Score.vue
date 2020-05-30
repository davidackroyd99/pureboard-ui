<template>
    <div>
        {{ this.sumVotes() }}
    </div>
</template>

<script>

export default {
    name: 'score-display',

    props: ['votes'],

    data() {
        return {
        }
    },

    methods: {
        sumVotes() {
            return this.votes.length;
        }
    },
}

</script>

<style scoped>
</style>