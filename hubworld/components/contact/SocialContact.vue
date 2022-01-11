<template>
    <section class="social-contact">
        <p>— find me elsewhere</p>
        <ul>
            <li v-for="(link, i) in links" :key="i"><a class="text-link" :href="link.url" target="_blank">{{ link.name }}</a></li>
        </ul>
    </section>
</template>

<script>
import {mapState} from 'vuex';

export default {
    computed: {
        ...mapState({
            socials: state => state.globals.socials
        }),

        links() {
            return [
                { name: 'bandcamp', url: this.socials?.bandcamp },
                { name: 'soundcloud', url: this.socials?.soundcloud },
                { name: 'twitter', url: this.socials?.twitter },
                { name: 'github', url: this.socials?.github },
            ];
        }
    }
}
</script>

<style lang="scss" scoped>
.social-contact {
    text-align: right;
}
</style>