<template>
    <section class="container">
        <p>works</p>
        <nuxt-link to="works/single">go to single</nuxt-link>

        <article v-for="(article, i) in articles" :key="i">
            <h2>{{ article.title }}</h2>
        </article>
    </section>
</template>

<script>
    import DiagLine from '~/components/svg/DiagLine.vue';

    import meta from '~/plugins/page-meta.mixin.js';
    import worksQuery from '~/queries/works.gql';
    import gql from 'graphql-tag';

    export default {
        mixins: [meta],

        components: {
            'diag-line': DiagLine,
        },

        computed: {
            articles() {
                return this.entries.edges.map(edge => edge.node);
            }
        },

        head() {
            return {
                title: 'works | netherwaves'
            }
        },

        apollo: {
            entries: {
                query: worksQuery,
                variables() {
                    return {
                        limit: 5
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
.container {
    position: relative;
    display: flex;
    align-items: center;
}
</style>