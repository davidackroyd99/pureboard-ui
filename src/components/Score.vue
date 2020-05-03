<template>
    <div>
        {{ this.sumVotes(this.link.votes) }}
    </div>
</template>

<script>

export default {
    name: 'score-display',

    props: ['link'],

    data() {
        return {
        }
    },

    methods: {
        sumVotes: (votes) => {
            var sum = 0;
            
            for(var i = 0; i < votes.length; i ++) {
                sum += votes[i].score;
            }

            return sum
        }
    },
}

</script>

<style scoped>
</style>