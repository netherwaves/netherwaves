<template>
    <div class="sphere">
        <div></div>
        <div class="ripple"></div>
        <div class="ripple"></div>
    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    mounted() {
        this.$nuxt.$on('loader-leave', ::this.onLoaderLeave);
    },

    methods: {
        rescale(tl, scale) {
            tl.set(this.$el, Object.assign({ width: `${ 200 * scale }px`, onComplete: () => {
                if (scale === 0) gsap.set(this.$el, { visibility: 'hidden', delay: 1 });
            } }, scale === 0 ? {} : { visibility: 'visible' }), 0);
        },

        onLoaderLeave() {
            const tl = gsap.timeline();
            const $ripples = this.$el.querySelectorAll(".ripple");

            tl.fromTo($ripples, { autoAlpha: 1 }, { autoAlpha: 0, delay: 0.1, duration: .7, ease: 'power1.out', stagger: 0.2 }, 0);
            tl.fromTo($ripples, { scale: 1 }, { scale: 1.3, ease: 'power3.out', duration: 1.2, stagger: 0.2 }, 0);
        },
    }
}
</script>

<style lang="scss" scoped>
.sphere {
    width: 0px;
    transition: width 0.7s ease-in-out;
    visibility: hidden;

    & > div {
        height: 0;
        padding-top: 100%;
        border-radius: 50%;
        border: 1px solid $black;
        @include dynamicBg;

        &:not(:first-child) {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background: none;
        }
    }
}
</style>