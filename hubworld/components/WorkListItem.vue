<template>
    <article class="work" @mouseleave="onMouseLeave">
        <div class="work__container">
            <a
                v-if="data.links && data.links.length"
                :href="data.links[0].url"
                class="col-6 offset-2 col-tablet-8 offset-tablet-0 work__left"
                @mouseenter="onMouseEnter"
                @click="onClick"
            >
                <div class="work__title-container">
                    <p class="work__year">{{ data.year }}</p>
                    <h2 class="work__title" :data-client="data.client">{{ data.title }}</h2>
                </div>
                <h3 class="work__subtitle">{{ data.subtitle || "A/V" }}</h3>
            </a>
            <div
                v-else
                class="col-6 offset-2 col-tablet-8 offset-tablet-0 work__left"
                @mouseenter="onMouseEnter"
            >
                <div class="work__title-container">
                    <p class="work__year">{{ data.year }}</p>
                    <h2 class="work__title" :data-client="data.client">{{ data.title }}</h2>
                </div>
                <h3 class="work__subtitle">{{ data.subtitle || "A/V" }}</h3>
            </div>
            <div class="col-3 offset-1 col-tablet-12 offset-tablet-0 work__right">
                <div
                    class="work__summary"
                    v-if="data.summary"
                    v-html="data.summary.content"
                ></div>
                <ul class="work__links" v-if="data.links && data.links.length">
                    <li v-for="(link, i) in data.links" :key="i">
                        <a
                            v-if="link.enable"
                            class="text-link"
                            :href="link.url"
                            :target="link.newWindow ? '_blank' : ''"
                            >{{ link.label }}</a
                        >
                        <span v-else class="text-link disabled">
                            {{ link.label }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: ["data"],

    data() {
        return {
            hasEntered: false,
        };
    },

    methods: {
        onMouseEnter({ currentTarget }) {
            this.hasEntered = true;
            this.$emit("mouseenter", {
                currentTarget: currentTarget.closest(".work"),
            });
        },
        onMouseLeave({ currentTarget }) {
            if (!this.hasEntered) return;
            this.hasEntered = false;
            this.$emit("mouseleave", { currentTarget });
        },
        onClick(e) {
            if (document.body.classList.contains("mobile")) {
                e.preventDefault();

                const $workRight = e.currentTarget.nextElementSibling;
                if ($workRight) {
                    $workRight.style.setProperty("--scroll-height", `${ $workRight.scrollHeight }px`);
                }

                this.onMouseEnter(e);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.work {
    width: 100%;

    &:not(:first-child) {
        margin-top: 1.5rem;
    }

    &__container {
        position: relative;
        display: flex;
        align-items: flex-end;
        transition: opacity 0.4s ease;
        padding: 0 0.5rem;

        &.hovered {
            z-index: 2;

            @media (max-width: $tablet) {
                .mobile & {
                    .work__right {
                        height: var(--scroll-height);
                    }
                }
            }
        }

        @media (max-width: $tablet) {
            display: block;
        }
    }

    &__left {
        display: block;
        position: relative;
        padding: 0 0 1.5rem;

        @media (max-width: $tablet) {
            padding-bottom: 1rem;
        }

        &::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: 1px solid $black;
            width: 100%;
            transform-origin: 0;
            transition: transform 0.7s ease-in-out;

            .work__container.hovered & {
                transform: scaleX(2);
            }

            .view--works.work-hovered .work__container:not(.hovered) & {
                transform: scaleX(calc(5 / 6));
            }
        }
    }

    &__right {
        display: block;
        position: relative;
        padding: 0 0 1.5rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease, height 0.5s ease;
        text-align: right;
        height: 0;

        .work__container.hovered & {
            pointer-events: all;
            transition-delay: 0.3s;
            opacity: 1;
        }

        > * {
            position: absolute;
            right: 0;
            padding: 1rem 1.5rem 1.5rem 0;
            margin-right: -1rem;
            width: 100%;

            @media (max-width: $tablet) {
                margin-right: 0;
            }
        }
    }

    &__title {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 1.5rem;
        position: relative;

        @media (max-width: $tablet) {
            font-size: 21px;
        }

        &-container {
            position: relative;
        }

        &::after {
            content: attr(data-client);
            display: inline-block;
            font-size: 0.75rem;
            transform: translateY(-90%);
            margin-left: 0.25rem;
        }
    }

    &__subtitle {
        font-size: 0.75rem;
        letter-spacing: 0.02em;
    }

    &__year {
        position: absolute;
        bottom: 0;
        right: calc(100% + 2.25rem);
        font-size: 0.75rem;
        white-space: nowrap;
        pointer-events: none;

        @media (max-width: $tablet) {
            font-size: 10px;
            position: static;
        }
    }

    &__summary {
        font-size: 16px;
        letter-spacing: 0.02em;
        bottom: 0;

        @media (max-width: $tablet) {
            text-align: left;
            top: 0;
        }

        @media (max-width: $mobile) {
            font-size: 12px;
        }
    }

    &__links {
        top: 100%;

        @media (max-width: $tablet) {
            top: 0;
            padding-right: 0;
            transform: translateY(-100%);
            padding-bottom: 1rem;
        }
    }
}
</style>
