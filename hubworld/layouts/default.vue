<template>
    <div id="main">
        <v-header/>
        <nuxt/>
        <v-footer/>
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

<style lang="scss" scoped>
#main {
    height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr min-content;

    .container {
        overflow-x: hidden;
        position: relative;
    }
}
</style>
