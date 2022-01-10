<template>
    <footer>
        <span class="left">{{ formattedDate }}</span>
        <span class="center">{{ time.year }}</span>
        <span class="right">{{ hour }}<span class="colon">:</span>{{ minute }} {{ dayHalf }}</span>
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

            hour() {
                return (this.time.hour - 1) % 12 + 1;
            },
            minute() {
                return this.time.minute.toString().padStart(2, '0');
            },
            dayHalf() {
                return this.time.hour >= 12 ? 'pm' : 'am';
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

<style lang="scss">
footer {
    padding: 1.5rem;
    border-top: 1px solid $black;
    font-size: 21px;

    @include dynamicBg;

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

        .colon {
            animation-name: colon-blink;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-delay: 0s;
            animation-timing-function: linear;
        }
    }

    @keyframes live-blink {
        0% { opacity: 0.4; filter: blur(1px); }
        8% { opacity: 1; filter: blur(0); }
        100% { opacity: 0.4; filter: blur(1px); }
    }

    @keyframes colon-blink {
        0% { opacity: 1; }
        49% { opacity: 1; }
        50% { opacity: 0; }
        99% { opacity: 0; }
    }
}
</style>
