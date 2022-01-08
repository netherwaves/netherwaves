<template>
    <section class="container">
        <diag-line></diag-line>
        <p>works</p>
        <nuxt-link to="works/single">go to single</nuxt-link>
    </section>
</template>

<script>
    import DiagLine from '~/components/svg/DiagLine.vue';

    export default {
        components: {
            'diag-line': DiagLine,
        },

        head() {
            return {
                title: 'works | netherwaves'
            }
        }
    }
</script>

<style lang="scss">
.container {
    position: relative;
}
</style>