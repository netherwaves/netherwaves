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
    data() {
        return {
            allowRepeat: false
        }
    },

    mounted() {
        this.$nuxt.$on('sphere-blink', ::this.onSphereBlink);
        this.$nuxt.$on('loader-enter', ::this.onLoaderEnter);
    },

    methods: {
        rescale(tl, scale) {
            tl.set(this.$el, Object.assign({ width: `${ 200 * scale }px`, onComplete: () => {
                if (scale === 0) gsap.set(this.$el, { visibility: 'hidden', delay: 1 });
            } }, scale === 0 ? {} : { visibility: 'visible' }), 0);
        },

        onSphereBlink() {
            if (this.blinkTL) return;

            this.blinkTL = gsap.timeline({ onComplete: () => {
                if (this.allowRepeat) {
                    this.blinkTL.restart();
                    this.blinkTL.play();
                } else {
                    this.blinkTL.kill();
                    this.blinkTL = null;
                }
            } });
            this.allowRepeat = true;

            const $ripples = this.$el.querySelectorAll(".ripple");
            this.blinkTL.fromTo($ripples, { autoAlpha: 1 }, { autoAlpha: 0, delay: 0.1, duration: .7, ease: 'power1.out', stagger: 0.2 }, 0);
            this.blinkTL.fromTo($ripples, { scale: 1 }, { scale: 1.3, ease: 'power3.out', duration: 1.2, stagger: 0.2 }, 0);
        },

        onLoaderEnter() {
            if (!this.blinkTL) return;
            this.allowRepeat = false;
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