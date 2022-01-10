<template>
    <section class="view view--contact" data-color="teal">
        contact
    </section>
</template>

<script>
    export default {
        head() {
            return {
                title: 'contact | netherwaves'
            }
        },

        mounted() {
            this.$nuxt.$emit('loader-enter', { el: this.$el });
        },
    }
</script>

<style lang="scss">
</style>