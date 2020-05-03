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
            var sum = 0;
            
            for(var i = 0; i < this.votes.length; i ++) {
                sum += this.votes[i].score;
            }

            return sum
        }
    },
}

</script>

<style scoped>
</style>