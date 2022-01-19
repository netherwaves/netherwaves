<template>
    <svg class="diag-line" viewBox="0 0 1440 341" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="-720.1" y1="510.5" x2="2159.9" y2="-169.5" stroke-width="1px" vector-effect="non-scaling-stroke"/>
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
    overflow: visible;

    line {
        stroke: $black;
        visibility: hidden;
    }
}
</style>