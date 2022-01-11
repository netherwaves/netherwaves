<template>
    <article class="work">
        <div class="work__container">
            <p class="work__year">{{ data.year }}</p>
            <h2 class="work__title" :data-client="data.client">{{ data.title }}</h2>
        </div>
        <p class="work__subtitle">{{ data.subtitle || 'A/V' }}</p>
    </article>
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style lang="scss" scoped>
.work {
    padding: 1.5rem 0;
    border-bottom: 1px solid $black;

    &__container {
        position: relative;
    }

    &__title {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 1.5rem;
        position: relative;

        &::after {
            content: attr(data-client);
            display: inline-block;
            font-size: 0.75rem;
            transform: translateY(-90%);
            margin-left: 0.25rem;
        }
    }

    &__subtitle {
        font-size: 0.75rem;
        letter-spacing: .02em;
    }

    &__year {
        position: absolute;
        bottom: 0;
        right: calc(100% + 2.25rem);
        font-size: .75rem;
        white-space: nowrap;
    }
}
</style>