<template>
    <a @click="fire_event" class="vote-arrow" :class="{hidden: !this.canVote}" href="#">{{ get_arrow() }}</a>
</template>

<script>

export default {
    props: ['score'],

    data() {
        return {
            canVote: true,
        };
    },

    methods: {
        get_arrow() {
            if(this.score == 1) {
                return "▲";
            }
            else {
                return "▼";
            }
        },

        fire_event() {
            this.$emit("new_score", this.score);
            this.canVote = false;
        }
    }
}

</script>

<style scoped>

.hidden {
    visibility: hidden;
}

</style>