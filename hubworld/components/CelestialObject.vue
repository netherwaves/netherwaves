<template>
    <section class="supernovae">
        <li v-for="(sn, i) in Object.values(supernovae)" :key="i">
            {{ sn.name[0] }} - {{ sn.ra[0].value }} | {{ sn.dec[0].value }}
        </li>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            supernovae: {}
        }
    },

    async fetch() {
        return this.getSupernovae();
    },

    methods: {
        async getSupernovae() {
            const { data } = await axios.get(`https://api.sne.space/catalog?ra=${this.generateTime(2, 24)}&dec=${this.generateTime(-90, 90)}&radius=3000`);
            if (data?.message) {
                return;
            }

            this.supernovae = data;
        },

        generateTime(minHours = 5, maxHours = 55) {
            let hours = (Math.floor(Math.random() * (maxHours - minHours)) + minHours);
            if (hours < 0) hours = '-' + Math.abs(hours).toString().padStart(2, '0');
            else hours = hours.toString().padStart(2, '0');

            const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            const decimals = Math.floor(Math.random() * 100).toString().padStart(2, '0');

            const output = `${hours}:${minutes}:${seconds}`;
            return output;
        }
    }
}
</script>