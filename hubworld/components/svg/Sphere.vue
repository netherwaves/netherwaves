<template>
    <div class="sphere"><div></div></div>
</template>

<script>
import gsap from 'gsap';

export default {
    methods: {
        rescale(tl, scale) {
            tl.set(this.$el, Object.assign({ width: `${ 200 * scale }px`, onComplete: () => {
                if (scale === 0) gsap.set(this.$el, { visibility: 'hidden', delay: 1 });
            } }, scale === 0 ? {} : { visibility: 'visible' }), 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.sphere {
    width: 0px;
    transition: width 1s ease-in-out;
    visibility: hidden;

    & > div {
        height: 0;
        padding-top: 100%;
        border-radius: 50%;
        border: 1px solid $black;
        @include dynamicBg;
    }
}
</style>