<template>
    <section class="view view--home" data-color="fuschia">
    </section>
</template>

<script>
    import CelestialObject from '~/components/CelestialObject.vue';

    export default {
        components: {
            'celest': CelestialObject
        },

        head() {
            return {
                title: 'netherwaves | welcome'
            }
        },

        mounted() {
            this.$nuxt.$emit('loader-enter', { el: this.$el });
            this.$nuxt.$emit('line-up');
        }
    }
</script>

<style lang="scss">

</style>