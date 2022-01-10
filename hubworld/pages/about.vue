<template>
    <section class="view view--about" data-color="lime">
        about
    </section>
</template>

<script>
    export default {
        head() {
            return {
                title: 'about | netherwaves'
            }
        },

        mounted() {
            this.$nuxt.$emit('loader-enter', { el: this.$el });
        },
    }
</script>

<style lang="scss">
</style>