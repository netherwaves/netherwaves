<template>
    <section class="view view--work-single" data-color="amber">
        work single
    </section>
</template>

<script>
    export default {
        head() {
            return {
                title: 'work single | netherwaves'
            }
        },

        mounted() {
            this.$nuxt.$emit("loader-enter", { el: this.$el });
        }
    }
</script>

<style lang="scss">
</style>