<template>
    <section class="view view--works wrapper" data-color="amber">
        <h1>works</h1>

        <div class="row">
            <work class="col-6 offset-2" v-for="(work, i) in works" :key="i" :data="work"></work>
        </div>
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
                        limit: 5,
                        offset: 0
                    }
                },
                update(data) {
                    this.entries = data.entries;
                    this.$nextTick(() => {
                        this.$nuxt.$emit('loader-enter', { el: this.$el });
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
.wrapper {
    padding-top: 7vh;
}
</style>