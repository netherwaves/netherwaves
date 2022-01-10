<template>
    <div id="main">
        <v-header/>
        <div class="container">
            <nuxt/>
            <line-container></line-container>
        </div>
        <v-footer/>
        <v-loader/>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue';
    import Footer from '~/components/Footer.vue';
    import Loader from '~/components/Loader.vue';

    import LineContainer from '~/components/LineContainer.vue';

    export default {
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-loader': Loader,

            'line-container': LineContainer,
        }
    }
</script>

<style lang="scss" scoped>
#main {
    height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    overflow: hidden;

    .container {
        position: relative;
    }
}
</style>
