<template>
    <a @click="fire_event" class="vote-arrow" href="#">{{ get_arrow() }}</a>
</template>

<script>

export default {
    props: ['score'],

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
        }
    }
}

</script>

<style scoped>

</style>