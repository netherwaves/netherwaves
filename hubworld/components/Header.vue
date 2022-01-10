<template>
    <header class="header">
        <div class="header__title">
            <nuxt-link to="/">netherwaves</nuxt-link>
        </div>

        <nav class="header__nav">
            <ul>
                <li><nuxt-link to="/works">works</nuxt-link></li>
                <li><nuxt-link to="/about">about</nuxt-link></li>
                <li><nuxt-link to="/contact">contact</nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    mounted() {
        this.$el.classList.add("show-line");
    }
}
</script>

<style lang="scss">
.header {
    z-index: 1;
    padding: 1.5rem;
    text-transform: uppercase;
    position: sticky;
    top: 0;

    &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        bottom: 0;
        border-bottom: 1px solid $black;
        pointer-events: none;

        transform: scaleX(0);
        transform-origin: 100% 0;
        transition: transform 0.5s ease-in-out;
    }

    &.show-line::after {
        transform: scaleX(1);
    }

    @include dynamicBg;

    display: flex;
    justify-content: space-between;

    &__nav ul {
        display: flex;
        column-gap: 4rem;
    }
}
</style>