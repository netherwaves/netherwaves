<template>
    <div class="diag-line__container" ref="container">
        <div class="line-container" ref="line">
            <scroll-mask class="scroll-mask hidden"></scroll-mask>
            <diag-line></diag-line>
        </div>
        <sphere ref="sphere" class="sphere"></sphere>
    </div>
</template>

<script>
import gsap from 'gsap';

import DiagLine from '~/components/svg/DiagLine.vue';
import ScrollMask from '~/components/svg/ScrollMask.vue';
import Sphere from '~/components/svg/Sphere.vue';

export default {
    components: {
        'diag-line': DiagLine,
        'scroll-mask': ScrollMask,
        'sphere': Sphere,
    },

    data() {
        return {
            isFanDown: false
        }
    },

    beforeMount() {
        this.$scrollMask = this.$el.querySelector(".scroll-mask");

        this.$nuxt.$on('line-down', ::this.onLineDown);
        this.$nuxt.$on('line-up', ::this.onLineUp);
        this.$nuxt.$on('line-side', ::this.onLineSide);
        this.$nuxt.$on('line-hide', ::this.onLineHide);
        this.$nuxt.$on('line-error', ::this.onLineError);

        this.$nuxt.$on('fan-down', ::this.fanDown);
        this.$nuxt.$on('fan-up', ::this.fanUp);

        this.$nuxt.$on('loader-enter', ::this.onLoaderEnter);
    },

    mounted() {
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(this.$refs.line.querySelector("line"), { drawSVG: '100%', duration: 2, ease: 'power2.inOut' });

        this.tl.play();
    },

    methods: {
        onLoaderEnter() {
            
        },
        onLineDown() {
            const tl = gsap.timeline();
            this.moveContainer(tl, '50%', 0);
            this.moveLine(tl, '-50%');
            this.toggleScrollMask(false);
            this.$refs.sphere.rescale(tl, 0.5);
        },
        onLineSide() {
            const tl = gsap.timeline();
            this.moveContainer(tl, 0, -90);
            this.moveLine(tl, '50%');
            this.toggleScrollMask(true);
            this.$refs.sphere.rescale(tl, 0.5);
        },
        onLineHide() {
            const tl = gsap.timeline();
            this.moveContainer(tl, '50%', 0);
            this.moveLine(tl, '0');
            this.toggleScrollMask(false);
            this.$refs.sphere.rescale(tl, 0.5);
        },
        onLineUp() {
            const tl = gsap.timeline();
            this.moveContainer(tl, 0, 0);
            this.moveLine(tl, 0);
            this.toggleScrollMask(false);
            this.$refs.sphere.rescale(tl, 1);
        },
        onLineError() {
            const tl = gsap.timeline();
            this.moveContainer(tl, 0, 0);
            this.moveLine(tl, 0);
            this.toggleScrollMask(true);
            this.$refs.sphere.rescale(tl, 0);
        },

        fanDown() {
            if (this.isFanDown) return;
            this.isFanDown = true;

            if (this.fanTL) this.fanTL.kill();
            this.fanTL = gsap.timeline();

            this.fanTL.set(this.$refs.line, { transformOrigin: '0 100%' }, 0);
            this.fanTL.to(this.$refs.line, { duration: 0.6, rotation: 5, ease: 'power2.out', force3D: true }, 0);
        },
        fanUp() {
            if (!this.isFanDown) return;
            this.isFanDown = false;

            if (this.fanTL) this.fanTL.kill();
            this.fanTL = gsap.timeline({ clearProps: true });

            this.fanTL.to(this.$refs.line, { duration: 2, rotation: 0, ease: 'power3.inOut', force3D: true }, 0);
            this.fanTL.set(this.$refs.line, { transformOrigin: '0 100%' });
        },

        onResize() {

        },

        // animations
        moveContainer(tl, distance, angle) {
            tl.to(this.$refs.container, { duration: 1.1, y: distance, rotation: angle, ease: 'power2.inOut', force3D: true }, 0);
        },
        moveLine(tl, distance) {
            tl.to(this.$refs.line, { duration: 1.1, y: distance, ease: 'power2.inOut', force3D: true }, 0);
        },
        toggleLineDraw(tl, hide = true) {
            gsap.killTweensOf(this.$refs.line.querySelector("line"));
            tl.to(this.$refs.line.querySelector("line"), { drawSVG: hide ? 0 : '100%', duration: 1, ease: 'power2.inOut' }, 0);
        },
        toggleScrollMask(hide = true) {
            this.$scrollMask.classList[hide ? 'add' : 'remove']("hidden");
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

    @media (max-width: $mobile) {
        transform: translate(-50%, -50%);
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