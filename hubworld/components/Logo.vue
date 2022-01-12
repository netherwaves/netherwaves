<template>
    <nuxt-link
        to="/"
        class="flap-text"
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave"
        ><span class="to-split">netherwaves</span></nuxt-link
    >
</template>

<script>
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

export default {
    mounted() {
        this.splitText = new SplitText(this.$el.querySelector(".to-split"), { type: 'chars' });
        this.onMouseLeave();
    },

    beforeDestroy() {
        if (this.splitText)
            this.splitText.destroy();

        this.splitText = null;
    },

    methods: {
        onMouseEnter(e) {
            if (this.driftDelay) {
                this.driftDelay.kill();
                this.driftDelay = null;
            }
            
            if (this.drift) {
                this.drift.kill();
                this.drift = null;
            }

            gsap.to(this.splitText.chars, { duration: 0.6, ease: 'power3.out', y: 0, x: 0, rotation: 0, force3D: true });
        },

        onMouseLeave(e) {
            this.driftDelay = gsap.delayedCall(10, ::this.driftoff);
        },

        driftoff() {
            this.$el.style.setProperty("overflow", "visible");

            for (let i = 0; i < this.splitText.chars.length; i++) {
                gsap.to(this.splitText.chars[i], {
                    duration: 0.1,
                    opacity: 0.55,
                    ease: 'linear',
                    delay: i * 0.025,
                    yoyo: true,
                    repeat: 1
                });
            }

            this.drift = gsap.to(this.splitText.chars, {
                duration: 20,
                ease: 'power1.inOut',
                x: () => `${ Math.random() > 0.7 ? Math.floor(Math.random() * 70) - 35 : 0 }%`,
                y: () => `${ Math.floor(Math.pow(Math.random(), 3) * 100) * (Math.random() > 0.5 ? -1 : 1) }%`,
                rotation: () => Math.floor(Math.pow(Math.random(), 3) * 15 * (Math.random() > 0.5 ? -1 : 1)),
                force3D: true,
            });
        }
    }
}
</script>

<style lang="scss">
.to-split > div {
    will-change: transform;
}
</style>