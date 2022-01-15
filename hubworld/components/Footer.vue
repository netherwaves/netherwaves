<template>
    <footer>
        <div class="left flap-text">
            <span>{{ formattedDate }}</span>
        </div>
        <span class="center flap-text"><span><span>{{ time.year }}</span><span>NO RIGHTS RESERVED</span></span></span>
        <span class="right flap-text"><span>{{ hour }}<span class="colon">:</span>{{ minute }} {{ dayHalf }}</span></span>
    </footer>
</template>

<script>
import gsap from 'gsap';

    export default {
        data() {
            return {
                interval: null,
                time: {}
            }
        },

        computed: {
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

        mounted() {
            this.$el.classList.add("show-line");
            gsap.to(this.$el.querySelectorAll('.flap-text > span'), { y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2, delay: 0.5 });
        },

        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>

<style lang="scss">
footer {
    padding: 1.5rem;
    font-size: 21px;

    @include dynamicBg;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    z-index: 10;

    &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        top: 0;
        border-top: 1px solid $black;
        pointer-events: none;

        transform: scaleX(0);
        transform-origin: 0% 0;
        transition: transform 0.5s ease-in-out;
    }

    &.show-line::after {
        transform: scaleX(1);
    }

    .center {
        width: 100%;
        justify-self: center;
        text-align: center;
        overflow-y: hidden;
        position: relative;
        cursor: default;

        > span {
            width: 100%;
            > span {
                display: inline-block;
                transform: translate3d(0,0,0);
                transition: transform 0.5s ease;
                position: relative;
                will-change: transform;

                &:nth-child(2) {
                    position: absolute;
                    top: 0%;
                    left: 50%;
                    transform: translate3d(-50%, 100%, 0);
                    width: 100%;

                    @media (max-width: $mobile) {
                        display: none;
                    }
                }
            }
        }

        &:hover span {
            &:nth-child(1) {
                transform: translate3d(0, -100%, 0);
            }

            &:nth-child(2) {
                transform: translate3d(-50%, 0, 0);
            }
        }
    }

    .right {
        justify-self: right;

        > span {
            display: flex;
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
