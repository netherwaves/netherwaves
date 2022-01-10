<template>
    <section class="container">
        <diag-line></diag-line>
        work single
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
                title: 'work single | netherwaves'
            }
        }
    }
</script>

<style lang="scss">
</style>