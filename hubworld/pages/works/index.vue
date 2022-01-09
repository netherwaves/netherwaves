<template>
    <section class="wrapper">
        <h1>works</h1>

        <div class="row">
            <work class="col-6 offset-2" v-for="(article, i) in articles" :key="i" :data="article"></work>
        </div>
    </section>
</template>

<script>
    import DiagLine from '~/components/svg/DiagLine.vue';
    import WorkListItem from '~/components/WorkListItem.vue';

    import meta from '~/plugins/page-meta.mixin.js';
    import worksQuery from '~/queries/works.gql';

    export default {
        mixins: [meta],

        components: {
            'diag-line': DiagLine,
            'work': WorkListItem,
        },

        computed: {
            articles() {
                return this.entries?.edges.map(edge => edge.node);
            }
        },

        head() {
            return {
                title: 'works | netherwaves'
            }
        },

        apollo: {
            entries: {
                prefetch: true,
                query: worksQuery,
                variables() {
                    return {
                        limit: 5,
                        offset: 0
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
.wrapper {
    padding-top: 15vh;
}
</style>