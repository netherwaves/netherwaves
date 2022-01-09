<template>
    <section class="container">
        <diag-line></diag-line>
        about
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
                title: 'about | netherwaves'
            }
        }
    }
</script>

<style lang="scss">
.container {
    position: relative;
}
</style>