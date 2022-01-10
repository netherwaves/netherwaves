<template>
    <div class="diag-line__container" ref="container">
        <div class="line-container" ref="line"><diag-line></diag-line></div>
        <div class="sphere" ref="sphere">
            <div></div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';

import DiagLine from '~/components/svg/DiagLine.vue';

export default {
    components: {
        'diag-line': DiagLine
    },

    mounted() {
        this.$nuxt.$on('line-down', ::this.onLineDown);
        this.$nuxt.$on('line-up', this.)
    },

    methods: {
        onLineDown() {
            const tl = gsap.timeline();
            tl.to(this.$refs.container, { duration: 1.1, y: '50%', ease: 'power2.inOut' }, 0);
            tl.to(this.$refs.line, { duration: 1.1, y: '-50%', ease: 'power2.inOut' }, 0);
        },

        onLineSide() {
            const tl = gsap.timeline();
        },

        onLineUp() {
            const tl = gsap.timeline();
            tl.to(this.$refs.container, { duration: 1.1, y: '0', ease: 'power2.inOut' }, 0);
            tl.to(this.$refs.line, { duration: 1.1, y: '0', ease: 'power2.inOut' }, 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.diag-line {
    &__container {
        @include absoluteBox;
        @include flex(center, center);
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
</style>