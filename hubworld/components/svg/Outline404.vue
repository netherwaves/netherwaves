<template>
    <svg
        width="1695"
        height="761"
        viewBox="0 0 1695 761"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <mask id="path-1-inside-1_253_120" fill="white">
            <path
                d="M562 380C562 629.111 694.947 760 846.887 760C998.827 760 1131.77 629.111 1131.77 380C1131.77 130.889 998.827 0 846.887 0C694.947 0 562 130.889 562 380ZM846.887 79.1667C952.401 79.1667 1047.36 180.5 1047.36 380C1047.36 579.5 952.401 680.833 846.887 680.833C741.373 680.833 646.411 579.5 646.411 380C646.411 180.5 741.373 79.1667 846.887 79.1667Z"
            />
        </mask>
        <path
            d="M562 380C562 629.111 694.947 760 846.887 760C998.827 760 1131.77 629.111 1131.77 380C1131.77 130.889 998.827 0 846.887 0C694.947 0 562 130.889 562 380ZM846.887 79.1667C952.401 79.1667 1047.36 180.5 1047.36 380C1047.36 579.5 952.401 680.833 846.887 680.833C741.373 680.833 646.411 579.5 646.411 380C646.411 180.5 741.373 79.1667 846.887 79.1667Z"
            stroke="#181818"
            stroke-width="2"
            mask="url(#path-1-inside-1_253_120)"
            vector-effect="non-scaling-stroke"
        />
        <mask id="path-2-inside-2_253_120" fill="white">
            <path
                d="M0 581.055H342.92V760.5H427.33V581.055H522.293V507.167H427.33V0H290.163L0 517.722V581.055ZM105.514 507.167V501.889L321.817 121.889H342.92V507.167H105.514Z"
            />
        </mask>
        <path
            d="M0 581.055H342.92V760.5H427.33V581.055H522.293V507.167H427.33V0H290.163L0 517.722V581.055ZM105.514 507.167V501.889L321.817 121.889H342.92V507.167H105.514Z"
            fill="currentColor"
            stroke="#181818"
            stroke-width="2"
            mask="url(#path-2-inside-2_253_120)"
            vector-effect="non-scaling-stroke"
        />
        <mask id="path-3-inside-3_253_120" fill="white">
            <path
                d="M1172 581.055H1514.92V760.5H1599.33V581.055H1694.29V507.167H1599.33V0H1462.16L1172 517.722V581.055ZM1277.51 507.167V501.889L1493.82 121.889H1514.92V507.167H1277.51Z"
            />
        </mask>
        <path
            d="M1172 581.055H1514.92V760.5H1599.33V581.055H1694.29V507.167H1599.33V0H1462.16L1172 517.722V581.055ZM1277.51 507.167V501.889L1493.82 121.889H1514.92V507.167H1277.51Z"
            fill="currentColor"
            stroke="#181818"
            stroke-width="2"
            mask="url(#path-3-inside-3_253_120)"
            vector-effect="non-scaling-stroke"
        />
    </svg>
</template>

<script>
import gsap from 'gsap';

export default {
    mounted() {
        this.tween = gsap.from(this.$el.querySelectorAll("path"), { drawSVG: 0, stagger: 0.2, duration: 1.7, ease: 'quad.inOut', paused: true });
    },

    methods: {
        display() {
            if (this.tween)
                this.tween.play();
        }
    }
}
</script>

<style lang="scss" scoped>
svg {
    path {
        color: $grey;
    }
}
</style>