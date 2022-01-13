<template>
    <section class="view view--home" data-color="fuschia">
        <h1>netherwaves</h1>
    </section>
</template>

<script>
    import CelestialObject from '~/components/CelestialObject.vue';

    import meta from "~/plugins/page-meta.mixin.js";

    export default {
        mixins: [meta],

        components: {
            'celest': CelestialObject
        },

        mounted() {
            this.$nuxt.$emit('loader-enter', { el: this.$el });
            this.$nuxt.$emit('line-up');
        }
    }
</script>

<style lang="scss">

</style>