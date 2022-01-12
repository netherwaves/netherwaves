<template>
    <header class="header">
        <div class="header__title">
            <Logo></Logo>
        </div>

        <nav class="header__nav">
            <ul>
                <li v-for="(item, i) in navigation" :key="i"><nuxt-link :to="item.href" class="flap-text"><span>{{ item.title }}</span></nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import gsap from 'gsap';
import {mapState} from 'vuex';

import Logo from '~/components/Logo.vue';

export default {
    components: {
        'Logo': Logo,
    },

    computed: {
        ...mapState({
            navigation: state => state.navigation
        })
    },

    mounted() {
        this.$el.classList.add("show-line");
        gsap.to(this.$el.querySelectorAll('.flap-text > span'), { y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2, delay: 0.5 });

        console.log(this.navigation);
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