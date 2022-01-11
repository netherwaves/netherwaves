<template>
    <div class="sphere">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="99.5" vector-effect="non-scaling-stroke"/>
            <circle cx="100" cy="100" r="99.5" stroke="#181818" vector-effect="non-scaling-stroke"/>
        </svg>
    </div>
</template>

<script>
export default {
    methods: {
        rescale(tl, scale) {
            tl.set(this.$el.querySelector("svg"), { scale }, 0);
        }
    }
}
</script>

<style lang="scss">
.sphere svg {
    transform-origin: 50% 50%;
    transition: transform 1s ease-in-out;
    transform: scale(0);

    circle:first-child {
        @include dynamicBg(fill);
    }

}
</style>