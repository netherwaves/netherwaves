<template>
    <section class="view view--about" data-color="lime">
        <h1>about</h1>
        <LocomotiveScroll ref="scroller">
            <div class="wrapper">
                <InfoFrameIntro></InfoFrameIntro>
                <InfoFrame v-for="(frame, i) in infoFrames" :key="i" :data="frame"></InfoFrame>
            </div>
        </LocomotiveScroll>
    </section>
</template>

<script>
import InfoFrame from '~/components/about/InfoFrame.vue';
import InfoFrameIntro from '~/components/about/InfoFrameIntro.vue';

import aboutQuery from '~/queries/about.gql';

import meta from '~/plugins/page-meta.mixin.js';

export default {
    mixins: [meta],

    data() {
        return {
            entry: {}
        }
    },

    computed: {
        infoFrames() {
            return this.entry?.infoFrame;
        }
    },

    components: {
        'InfoFrame': InfoFrame,
        'InfoFrameIntro': InfoFrameIntro,
    },

    mounted() {
        this.$nuxt.$emit('line-hide');
    },

    apollo: {
        about: {
            query: aboutQuery,
            update(data) {
                this.entry = data?.entry;

                this.$nextTick(() => {
                    this.$nuxt.$emit('loader-enter', { el: this.$el });
                    this.$nuxt.$emit('update-locomotive');
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-bottom: 40vh;
}
</style>