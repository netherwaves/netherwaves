<template>
    <section class="view view--works" data-color="amber">

        <LocomotiveScroll>
            <div class="wrapper">
                <div class="row">
                    <work class="col-6 offset-2" v-for="(work, i) in works" :key="i" :data="work"></work>
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
</style>