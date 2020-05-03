<template>
    <span>{{ this.user.username }} ({{ this.user.profile.karma }}) </span>
</template>

<script>

export default {
    name: 'user-summary',

    props: ['user'],

    data() {
        return {
        }
    },

    methods: {
    },
}

</script>

<style scoped>
</style>