<template>
    <div class="diag-line__container" ref="container">
        <div class="line-container" ref="line">
            <scroll-mask class="scroll-mask hidden"></scroll-mask>
            <diag-line></diag-line>
        </div>
        <div class="sphere" ref="sphere">
            <div></div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';

import DiagLine from '~/components/svg/DiagLine.vue';
import ScrollMask from '~/components/svg/ScrollMask.vue';

export default {
    data() {
        return {
            hasInit: false
        }
    },

    components: {
        'diag-line': DiagLine,
        'scroll-mask': ScrollMask,
    },

    beforeMount() {
        this.$scrollMask = this.$el.querySelector(".scroll-mask");

        this.$nuxt.$on('line-down', ::this.onLineDown);
        this.$nuxt.$on('line-up', ::this.onLineUp);
        this.$nuxt.$on('line-side', ::this.onLineSide);
        this.$nuxt.$on('loader-enter', ::this.onLoaderEnter);
    },

    mounted() {
    },

    methods: {
        onLoaderEnter() {
            this.tl = gsap.timeline({ paused: true });
            this.tl.to(this.$refs.line.querySelector("line"), { drawSVG: '100%', duration: 1, ease: 'power2.inOut' });
            this.tl.from(this.$refs.sphere, { scale: 0, duration: 1, ease: 'power2.inOut' }, 0);


            this.tl.play();
        },

        onLineDown() {
            const tl = gsap.timeline();
            tl.to(this.$refs.container, { duration: 1.1, rotation: 0, y: '50%', ease: 'power2.inOut', force3D: true }, 0);
            tl.to(this.$refs.line, { duration: 1.1, y: '-50%', ease: 'power2.inOut' }, 0);

            this.$scrollMask.classList.remove("hidden");
        },

        onLineSide() {
            const tl = gsap.timeline();
            tl.to(this.$refs.container, { duration: 1.1, rotation: -90, ease: 'power2.inOut', force3D: true }, 0);
            tl.to(this.$refs.line, { duration: 1.1, y: '50%', ease: 'power2.inOut' }, 0);

            this.$scrollMask.classList.add("hidden");
        },

        onLineUp() {
            const tl = gsap.timeline();
            tl.to(this.$refs.container, { duration: 1.1, rotation: 0, y: '0', ease: 'power2.inOut', force3D: true }, 0);
            tl.to(this.$refs.line, { duration: 1.1, y: '0', ease: 'power2.inOut' }, 0);

            this.$scrollMask.classList.add("hidden");
        }
    }
}
</script>

<style lang="scss" scoped>
.diag-line {
    &__container {
        @include absoluteBox;
        @include flex(center, center);
        transform-origin: 50% 50%;
        pointer-events: none;
    }
}

.line-container {
    width: 100%;
}

.sphere {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    display: none;

    > div {
        height: 0;
        padding-top: 100%;
        border: 1px solid $black;
        border-radius: 50%;
        @include dynamicBg;
    }
}

.scroll-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    z-index: -1;

    &.hidden {
        visibility: hidden;
    }
}
</style>