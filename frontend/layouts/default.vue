<template>
    <div>
        <v-header/>
        <nuxt/>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue';
    import Footer from '~/components/Footer.vue';

    export default {
        components: {
            'v-header': Header,
            'v-footer': Footer,
        }
    }
</script>

<style>
    body {
        @apply font-sans;
        letter-spacing: 0.03em;
        font-size: 18px;

        background-color: #DFBCC4;
    }
</style>
