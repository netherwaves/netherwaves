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

<style lang="scss">
.header {
    z-index: 1;
    padding: 1.5rem;
    text-transform: uppercase;
    border-bottom: 1px solid $black;
    position: sticky;
    top: 0;

    @include dynamicBg;

    display: flex;
    justify-content: space-between;

    &__nav ul {
        display: flex;
        column-gap: 4rem;
    }
}
</style>