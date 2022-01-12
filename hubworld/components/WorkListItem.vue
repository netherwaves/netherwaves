<template>
    <article class="work" @mouseleave="onMouseLeave">
        <div class="work__container">
            <a
                v-if="data.links && data.links.length"
                :href="data.links[0].url"
                class="col-6 offset-2 work__left"
                @mouseenter="onMouseEnter"
            >
                <div class="work__title-container">
                    <p class="work__year">{{ data.year }}</p>
                    <h2 class="work__title" :data-client="data.client">{{ data.title }}</h2>
                </div>
                <h3 class="work__subtitle">{{ data.subtitle || "A/V" }}</h3>
            </a>
            <div
                v-else
                class="col-6 offset-2 work__left"
                @mouseenter="onMouseEnter"
            >
                <div class="work__title-container">
                    <p class="work__year">{{ data.year }}</p>
                    <h2 class="work__title" :data-client="data.client">{{ data.title }}</h2>
                </div>
                <h3 class="work__subtitle">{{ data.subtitle || "A/V" }}</h3>
            </div>
            <div class="col-3 offset-1 work__right">
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
    },
};
</script>

<style lang="scss" scoped>
.work {
    margin-top: 1.5rem;
    width: 100%;

    &__container {
        position: relative;
        display: flex;
        align-items: flex-end;
        transition: opacity 0.4s ease;

        &.hovered {
            z-index: 2;
        }
    }

    &__left {
        position: relative;
        padding: 0 0 1.5rem;

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
        position: relative;
        padding: 0 0 1.5rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        text-align: right;

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
        }
    }

    &__title {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 1.5rem;
        position: relative;

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
    }

    &__summary {
        font-size: 16px;
        letter-spacing: 0.02em;
        bottom: 0;
    }

    &__links {
        top: 100%;
    }
}
</style>
