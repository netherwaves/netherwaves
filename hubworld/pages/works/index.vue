<template>
    <section class="view view--works" data-color="amber">
        <LocomotiveScroll>
            <div class="wrapper">
                <div class="row">
                    <work
                        @mouseenter="onMouseEnter"
                        @mouseleave="onMouseLeave"
                        v-for="(work, i) in works"
                        :key="i"
                        :data="work"
                    ></work>
                </div>
            </div>
        </LocomotiveScroll>
    </section>
</template>

<script>
import gsap from "gsap";

import WorkListItem from "~/components/WorkListItem.vue";

import meta from "~/plugins/page-meta.mixin.js"; // TODO: FIX THIS
import worksQuery from "~/queries/works.gql";

export default {
    mixins: [meta],

    components: {
        work: WorkListItem,
    },

    data() {
        return {
            entries: {},
        };
    },

    computed: {
        works() {
            return this.entries?.edges?.map((edge) => edge.node);
        },
    },

    mounted() {
        this.$nuxt.$emit("line-down");
    },

    methods: {
        onMouseEnter({ currentTarget }) {
            if (!currentTarget.querySelector(".work__container > a")) return;

            this.$el.classList.add("work-hovered");
            currentTarget
                .querySelector(".work__container")
                .classList.add("hovered");

            // fan down
            if (this.delayedCall) this.delayedCall.kill();
            this.$nuxt.$emit("fan-down");
        },

        onMouseLeave({ currentTarget }) {
            if (!currentTarget.querySelector(".work__container > a")) return;

            this.$el.classList.remove("work-hovered");
            currentTarget
                .querySelector(".work__container")
                .classList.remove("hovered");

            // fan up
            this.delayedCall = gsap.delayedCall(0.3, () => this.$nuxt.$emit("fan-up"));
        },
    },

    apollo: {
        works: {
            query: worksQuery,
            variables() {
                return {
                    limit: 30,
                    offset: 0,
                };
            },
            update(data) {
                this.entries = data.entries;

                this.$nextTick(() => {
                    this.$nuxt.$emit("loader-enter", { el: this.$el });
                    this.$nuxt.$emit("update-locomotive");
                });
            },
        },
    },
};
</script>

<style lang="scss">

.view--works {
    .wrapper {
        padding-bottom: 60vh;
        height: 100%;
        margin: 0;
    }

    &.work-hovered {
        .work__container:not(.hovered) {
            opacity: 0.4;
        }
    }
}
</style>
