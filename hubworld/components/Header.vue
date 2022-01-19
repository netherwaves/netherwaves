<template>
    <header class="header">
        <div class="header__title">
            <Logo></Logo>
        </div>

        <div class="header__menu">
            <button class="header__menu-btn" @click="toggleMobileMenu"></button>
        </div>

        <nav class="header__nav">
            <ul>
                <li v-for="(item, i) in navigation" :key="i">
                    <GeneralLink class="flap-text" :data="{ url: item.href }" @click.native="toggleMobileMenu"><span>{{ item.title }}</span></GeneralLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import gsap from 'gsap';
import {mapState} from 'vuex';

import Logo from '~/components/Logo.vue';
import GeneralLink from '~/components/shared/GeneralLink.vue';

export default {
    components: {
        'Logo': Logo,
        'GeneralLink': GeneralLink,
    },

    computed: {
        ...mapState({
            navigation: state => state.navigation
        })
    },

    mounted() {
        this.$el.classList.add("show-line");
        gsap.to(this.$el.querySelectorAll('.flap-text > span'), { y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2, delay: 0.5 });
        gsap.to(this.$el.querySelector(".header__menu"), { opacity: 1, duration: 0.5, ease: 'linear', delay: 1 });
    },

    methods: {
        toggleMobileMenu({ currentTarget }) {
            if (!document.body.classList.contains('mobile')) return;

            const $btn = document.querySelector(".header__menu-btn");
            const $menu = $btn.parentElement;
            const open = !$menu.classList.contains("header__menu--open");

            $menu.classList.toggle("header__menu--open");
            $btn.style.setProperty("--line-height", open ? "200px" : "0");
        }
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

    @media (max-width: $mobile) {
        padding: 1.25rem 1rem;
    }

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
    align-items: center;

    &__nav {
        ul {
            display: flex;
            column-gap: 4rem;
        }

        @media (max-width: $mobile) {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                top: 0;
                height: 100vh;
                @include dynamicBg;
                transform: scaleY(0);
                transform-origin: 50% 0;
                transition: background-color 0.7s ease-in-out, transform 0.6s ease-out;
            }

            ul {
                flex-direction: column;
                padding: .5rem 1rem 0;
                opacity: 0;
                transition: opacity 0.4s ease;
                pointer-events: none;

                li {
                    padding: 1rem 0;
                }
            }
        }
    }

    &__title {
        .flap-text { display: block; }
    }

    &__menu {
        display: none;
        @media (max-width: $mobile) {
            display: block;
        }

        position: relative;
        z-index: 1;
        opacity: 0;

        &-btn {
            width: 32px;
            height: 32px;
            border: 1px solid $black;
            border-radius: 50%;
            background: none;
            position: relative;

            --line-height: 0;

            &::before {
                content: '';
                @include absoluteBox;
                width: 2px;
                height: 2px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: 0.4s transform ease;
                border-radius: 50%;
                background: $black;
            }

            &::after {
                content: '';
                @include absoluteBox;
                width: 1px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, 0);
                height: var(--line-height);
                background: $black;
                transition: 0.5s height ease;
            }
        }

        &--open {
            .header__menu-btn {
                &::before {
                    transform: translate(-50%, -50%) scale(5);
                }
            }

            + .header__nav {
                &::before {
                    transform: scaleY(1);
                }

                ul {
                    transition-delay: 0.3s;
                    opacity: 1;
                    pointer-events: all;
                }
            }
        }
    }
}
</style>