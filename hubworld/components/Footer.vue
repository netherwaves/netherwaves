<template>
    <footer>
        <span class="left">{{ formattedDate }}</span>
        <span class="center">{{ time.year }}</span>
        <span class="right">{{ formattedTime }}</span>
    </footer>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                interval: null,
                time: {}
            }
        },

        computed: {
            ...mapState({
                location: state => state.globals.location,
            }),

            formattedDate() {
                return (this.toWords(this.time.day) + ' ' + this.toWords(this.time.month + 1)).toUpperCase();
            },

            formattedTime() {
                return ((this.time.hour - 1) % 12 + 1) + ' ' + this.time.minute + ' ' + (this.time.hour >= 12 ? 'pm' : 'am');
            }
        },

        methods: {
            getTime() {
                const now = new Date();

                this.time = {
                    day: now.getDate(),
                    month: now.getMonth(),
                    year: now.getFullYear(),
                    hour: now.getHours(),
                    minute: now.getMinutes()
                }
            },

            toWords(n){
                let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one'];
                return words[n - 1];
            }
        },

        created() {
            this.getTime();
            this.interval = setInterval(this.getTime, 1000);
        },

        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>

<style lang="scss" scoped>
footer {
    padding: 1.5rem;
    border-top: 1px solid $black;
    background: $fuschia;
    font-size: 21px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .center {
        justify-self: center;
    }

    .right {
        justify-self: right;
        display: inline-flex;
        align-items: center;

        &::before {
            content: '';
            display: inline-block;
            margin-right: .75rem;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: $green;
            animation-name: live-blink;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-delay: 0s;
            animation-timing-function: ease-out;
        }
    }

    @keyframes live-blink {
        0% { opacity: 0.4; filter: blur(1px); }
        8% { opacity: 1; filter: blur(0); }
        100% { opacity: 0.4; filter: blur(1px); }
    }
}
</style>
