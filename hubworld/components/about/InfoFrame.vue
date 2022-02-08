<template>
    <article class="info-frame">
        <h2 class="title">{{ data.title }}</h2>
        <p v-if="data.__typename === 'InfoFrameTextFrame'" class="content" v-html="data.frameContent.content"></p>
        <div v-else-if="data.__typename === 'InfoFrameAssetFrame'">
            <p class="content"><a class="text-link" :href="data.asset[0].url" target="_blank">{{ data.label }}</a></p>
        </div>
    </article>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style lang="scss">
.info-frame {
    font-size: 40px;
    line-height: 1.1;
    display: grid;
    grid-template-columns: max-content 1fr;
    padding-bottom: 2.75rem;
    position: relative;

    &:not(:first-child) { margin-top: 2.5rem; }
    &:not(:last-child) {
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            display: block;
            border-bottom: 1px solid $black;
        }
    }

    @media (max-width: $tablet) {
        font-size: 21px;
        padding-bottom: 2rem;
        &:not(:first-child) { margin-top: 2rem; }
    }

    @media (max-width: $mobile) {
        font-size: 18px;
        padding-bottom: 1.5rem;
        &:not(:first-child) { margin-top: 1.5rem; }
    }

    .title {
        text-transform: uppercase;
    }

    .content {
        justify-self: flex-end;
        text-align: right;
    }
}
</style>