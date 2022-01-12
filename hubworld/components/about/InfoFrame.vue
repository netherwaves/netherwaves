<template>
    <article class="info-frame">
        <h2 class="title">{{ data.title }}</h2>
        <p class="content" v-html="data.frameContent.content"></p>
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
    grid-template-columns: 1fr 1fr;
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

    .title {
        text-transform: uppercase;
    }

    .content {
        justify-self: flex-end;
        text-align: right;
    }
}
</style>