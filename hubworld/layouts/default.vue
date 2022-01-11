<template>
    <div id="main">
        <v-header/>
        <div class="container">
            <div class="content">
                <nuxt/>
            </div>
            <line-container></line-container>
        </div>
        <v-footer/>
        <v-loader/>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue';
    import Footer from '~/components/Footer.vue';
    import Loader from '~/components/Loader.vue';

    import LineContainer from '~/components/LineContainer.vue';

    import gsap from 'gsap';

    export default {
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-loader': Loader,

            'line-container': LineContainer,
        },

        mounted() {
            this.$nuxt.$on('loco-scroll', this.scrollAnimations);
        },

        methods: {
            scrollAnimations() {
                //this.$initScrolltrigger(this.$refs.scroller.locomotive);
                gsap.delayedCall(0.5, () => {
                    this.$nuxt.$emit('update-locomotive');
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
#main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .container {
        position: relative;
        flex-grow: 1;

        .content {
            @include absoluteBox;
        }
    }
}
</style>
