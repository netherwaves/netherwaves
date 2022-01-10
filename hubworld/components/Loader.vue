<template>
    
</template>

<script>
import gsap from 'gsap';

export default {
    beforeMount() {
        this.$nuxt.$on('loader-enter', ::this.onLoaderEnter);
        this.$nuxt.$on('loader-leave', ::this.onLoaderLeave);
    },

    methods: {
        onLoaderEnter({ el, done }) {
            const tl = gsap.timeline({ onComplete: done });
            tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .5 });
            tl.play();

            // change background color
            document.documentElement.style.setProperty("--current-bg", `var(--palette-${ el.getAttribute("data-color") })`);
        },

        onLoaderLeave({ el, done }) {
            const tl = gsap.timeline({ onComplete: done });
            tl.to(el, { opacity: 0, duration: .5 });
            tl.play();
        },
    }
}
</script>