<template>
    <svg class="diag-line" viewBox="0 0 1440 341" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="-0.114896" y1="340.513" x2="1439.89" y2="0.513386" stroke-width="1px" vector-effect="non-scaling-stroke"/>
    </svg>
</template>

<script>
// TODO: extend line past viewbox
import gsap from 'gsap';

export default {
    beforeMount() {
        gsap.set(this.$el.querySelector("line"), { drawSVG: 0, visibility: 'visible' });
    }
}
</script>

<style lang="scss" scoped>
.diag-line {
    display: block;
    width: 100%;
    height: auto;

    line {
        stroke: $black;
        visibility: hidden;
    }
}
</style>