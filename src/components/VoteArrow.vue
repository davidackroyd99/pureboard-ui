<template>
    <a @click="fire_event" class="vote-arrow" :class="{hidden: !this.canVote}" href="#">{{ "▲" }}</a>
</template>

<script>

export default {
    data() {
        return {
            canVote: true,
        };
    },

    methods: {
        fire_event() {
            this.$emit("on_vote");
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