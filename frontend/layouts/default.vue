<template>
    <div id="main">
        <v-header/>
        <nuxt/>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue';
    import Footer from '~/components/Footer.vue';
    import CelestialObject from '~/components/CelestialObject.vue';

    export default {
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-celest': CelestialObject,
        }
    }
</script>

<style lang="scss" scoped>
#main {
    min-height: 100vh;

    .container {
        height: 100vh;
    }
}
</style>
