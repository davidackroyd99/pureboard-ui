                

<template>
    <a :href="link.url">{{ link.description }}</a>
</template>

<script>

export default {
    name: 'link',

    props: ['link'],

    data() {
        return {
        }
    },

    methods: {
    },
}

</script>