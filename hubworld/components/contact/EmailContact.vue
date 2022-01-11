<template>
    <section class="email-contact">
        <p>for questions, inquiries, commissions, conversations —</p>
        <ul>
            <li><a class="text-link" :href="mailto">{{ socials.email }}<span class="tooltip"></span></a></li>
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

        mailto() {
            return `mailto:${ this.socials?.email }`;
        }
    }
}
</script>