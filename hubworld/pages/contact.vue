<template>

    <div class="view view--contact" data-color="teal">
        <h1>contact</h1>
        <div class="wrapper">
            <div class="row row--h-center">
                <div class="col-10 col-tablet-12 contact__container">
                    <EmailContact class="contact-box contact-box__email"></EmailContact>
                    <SocialContact class="contact-box contact-box__social"></SocialContact>
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

    @media (max-width: $mobile) {
        padding-bottom: 1.5rem;
        padding-top: 12vh;
    }
}

.view--contact {
    height: 100%;
    display: flex;
    align-items: flex-end;

    @media (max-width: $mobile) {
        align-items: center;
    }
}

.contact__container {
    display: grid;
    grid-template-areas: 'email social';
    grid-template-columns: auto max-content;
    align-items: flex-end;

    @media (max-width: $mobile) {
        grid-template-areas: 'email .' 'social .';
        grid-template-columns: 2fr 1fr;
        justify-content: flex-start;
        row-gap: 20vh;
    }
}

.contact-box {
    &__email { grid-area: email; }
    &__social { grid-area: social; }
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

    @media (max-width: $mobile) {
        p {
            font-size: 12px;
        }

        li {
            font-size: 16px;
            margin: 0.25rem 0;
        }
    }
}
</style>