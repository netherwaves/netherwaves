<template>
    <footer>
        <span class="left">EIGHTEEN NINE</span>
        <span class="center">2021</span>
        <span class="right">4 34 pm</span>
    </footer>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                location: state => state.globals.location,
            })
        }
    }
</script>

<style lang="scss" scoped>
footer {
    padding: 1.5rem;
    border-top: 1px solid $black;
    font-size: 21px;
    position: sticky;
    bottom: 0;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .center {
        justify-self: center;
    }

    .right {
        justify-self: right;
        &::before {
            content: '';
            display: inline-block;
            margin-right: .75rem;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: $green;
        }
    }
}
</style>
