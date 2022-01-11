<template>
    <section class="view view--works" data-color="amber">
        <LocomotiveScroll>
            <div class="wrapper">
                <div class="row">
                    <work @mouseenter.native="onMouseEnter" @mouseleave.native="onMouseLeave" v-for="(work, i) in works" :key="i" :data="work"></work>
                </div>
            </div>
        </LocomotiveScroll>
    </section>
</template>

<script>
    import WorkListItem from '~/components/WorkListItem.vue';

    import meta from '~/plugins/page-meta.mixin.js';    // TODO: FIX THIS
    import worksQuery from '~/queries/works.gql';

    export default {
        components: {
            'work': WorkListItem,
        },

        data() {
            return {
                entries: {}
            }
        },

        computed: {
            works() {
                return this.entries?.edges?.map(edge => edge.node);
            }
        },

        head() {
            return {
                title: 'works | netherwaves'
            }
        },

        mounted() {
            this.$nuxt.$emit("line-down");
        },

        methods: {
            onMouseEnter({ currentTarget }) {
                if (!currentTarget.querySelector("a.work__container")) return;
                this.$el.classList.add("work-hovered");
                currentTarget.querySelector(".work__container").classList.add("hovered");
            },

            onMouseLeave({ currentTarget }) {
                this.$el.classList.remove("work-hovered");
                currentTarget.querySelector(".work__container").classList.remove("hovered");
            },
        },

        apollo: {
            works: {
                query: worksQuery,
                variables() {
                    return {
                        limit: 30,
                        offset: 0
                    }
                },
                update(data) {
                    this.entries = data.entries;

                    this.$nextTick(() => {
                        this.$nuxt.$emit('loader-enter', { el: this.$el });
                        this.$nuxt.$emit('update-locomotive');
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
.wrapper {
    padding-bottom: 60vh;
}

.view--works {
    &.work-hovered {
        .work__container:not(.hovered) {
            opacity: 0.4;
        }
    }
}
</style>