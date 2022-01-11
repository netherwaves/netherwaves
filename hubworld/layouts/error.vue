<template>
    <section class="view view--error" data-color="grey">
        <h1 v-if="error.statusCode === 404" class="text-3xl font-bold">Page not found</h1>
        <h1 v-else class="text-3xl font-bold">An error occurred</h1>
        <outline-404 ref="number" class="outline-404"></outline-404>

        <div class="wrapper">
            <div class="row row--h-center">
                <div class="frame">this page does not exist <span>yet</span>.</div>
            </div>
            <div class="row row--h-center">
                <nuxt-link to="/">go back</nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
    import Outline404 from '~/components/svg/Outline404.vue';

    import gsap from 'gsap';

    export default {
        layout: 'default',

        components: {
            'outline-404': Outline404,
        },

        props: {
            error: {
                type: Object,
                required: true,
            }
        },

        mounted() {
            this.$nuxt.$emit("loader-enter", { el: this.$el });
            this.$refs.number.display();

            gsap.set(this.$el.querySelector(".frame"), { autoAlpha: 1, delay: 1.3 });
        },

    }
</script>

<style lang="scss" scoped>
.outline-404 {
    height: calc(100% + 3px);
    width: auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-1px);
    pointer-events: none;
}

.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
    z-index: 1;
    padding-bottom: 2rem;
}

.frame {
    text-transform: uppercase;
    border: 1px solid $black;
    padding: 30px 95px;
    font-size: 21px;
    margin-bottom: 1.5rem;
    opacity: 0;

    @include dynamicBg;
};
</style>
