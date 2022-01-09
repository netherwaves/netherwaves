<template>
    <section class="container">
        <diag-line></diag-line>
        <div class="sphere"><div></div></div>
    </section>
</template>

<script>
    import DiagLine from '~/components/svg/DiagLine.vue';

    export default {
        components: {
            'diag-line': DiagLine,
        },

        head() {
            return {
                title: 'netherwaves | welcome'
            }
        }
    }
</script>

<style lang="scss">
.container {
    position: relative;
    
    .diag-line {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .sphere {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;

        > div {
            height: 0;
            padding-top: 100%;
            border: 1px solid $black;
            border-radius: 50%;
            background: $fuschia;
        }
    }
}
</style>