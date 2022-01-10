<template>
    <section class="container">
        <diag-line></diag-line>
        
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
                title: 'contact | netherwaves'
            }
        }
    }
</script>

<style lang="scss">
</style>