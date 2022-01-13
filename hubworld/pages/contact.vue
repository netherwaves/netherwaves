<template>

    <div class="view view--contact" data-color="teal">
        <h1>contact</h1>
        <div class="wrapper">
            <div class="row row--h-center">
                <div class="col-10 contact__container">
                    <EmailContact class="contact-box"></EmailContact>
                    <SocialContact class="contact-box"></SocialContact>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmailContact from '~/components/contact/EmailContact.vue';
import SocialContact from '~/components/contact/SocialContact.vue';

import meta from '~/plugins/page-meta.mixin.js';

    export default {
        mixins: [meta],

        components: {
            'EmailContact': EmailContact,
            'SocialContact': SocialContact
        },

        mounted() {
            this.$nuxt.$emit('loader-enter', { el: this.$el });
            this.$nuxt.$emit('line-side');
        },
    }
</script>

<style lang="scss" scoped>
.wrapper {
    padding-bottom: 12vh;
}

.view--contact {
    height: 100%;
    display: flex;
    align-items: flex-end;
}

.contact__container {
    display: grid;
    align-items: flex-end;
    grid-template-columns: auto max-content;
}
</style>

<style lang="scss">

.contact-box {
    p {
        margin-bottom: 0.25rem;
    }

    li {
        font-size: 30px;
        margin: 0.5rem 0;
    }
}
</style>