<template>
    <header class="header">
        <div class="header__title">
            <h1><nuxt-link to="/">netherwaves</nuxt-link></h1>
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

<style>
.header {
    padding: 1.5rem;
    text-transform: uppercase;

    display: flex;
    justify-content: space-between;
}

.header__nav ul {
    display: flex;
    column-gap: 4rem;
}
</style>