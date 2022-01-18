<template>
    <a
        v-if="link.url && (isExternalLink(link.url) || isFileLink(link.url))"
        :href="link.url"
        :target="link.target ? '_blank' : ''"
        :rel="link.target ? 'noopener' : null"
        @click="onClick"
    >
        <slot></slot>
        <template v-if="!this.$slots.default">
            {{ link.title }}
        </template>
    </a>
    <a
        v-else-if="link.url && link.target"
        :href="link.url"
        :target="link.target ? '_blank' : ''"
        :rel="link.target ? 'noopener' : null"
        @click="onClick"
    >
        <slot></slot>
        <template v-if="!this.$slots.default">
            {{ link.title }}
        </template>
    </a>
    <a v-else-if="link.url && link.type === 'tel'" :href="tel" @click="onClick">
        <slot></slot>
        <template v-if="!this.$slots.default">
            {{ link.title }}
        </template>
    </a>
    <a v-else-if="link.url && link.type === 'email'" :href="email" @click="onClick">
        <slot></slot>
        <template v-if="!this.$slots.default">
            {{ link.title }}
        </template>
    </a>
    <nuxt-link v-else-if="link.url" :to="getPath(link.url)" @click.native="onClick">
        <slot></slot>
        <template v-if="!this.$slots.default">
            {{ link.title }}
        </template>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        data: {
            default: function () {
                return { url: "" };
            },
        },
    },
    methods: {
        isExternalLink: function (url) {
            if (/^https?:\/\//.test(url)) {
                // Absolute URL.
                return !url.includes(process.env.SITE_DOMAIN);
            } else {
                // Relative URL.
                return false;
            }
        },
        validateEmail(email) {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        isFileLink(url) {
            if (/\.[0-9a-z]+$/.test(url) && !this.validateEmail(url)) {
                // file URL
                return true;
            } else {
                // normal URL
                return false;
            }
        },

        getPath(url) {
            try {
                if (url.match(/\?./)) {
                    let urlObject = new URL(url);
                    var object = { path: urlObject.pathname, query: {} };
                    urlObject.searchParams.forEach(function (value, key) {
                        object.query[key] = value;
                    });
                    return object;
                } else if (url.match(/^\/[a-z0-9]+$/i) || url === '/') {
                    return url;
                } else {
                    return new URL(url).pathname;
                }
            } catch (error) {
                console.log(error);
                return "/";
            }
        },

        onClick() {
            this.$nuxt.$emit('sphere-blink');
        }
    },
    computed: {
        link: function () {
            return this.data || { url: "" };
        },

        tel: function () {
            return `tel:+1${this.data.url.replace(/[\.\-\(\)\[\]\s]/g, "")}`;
        },

        email: function () {
            return `mailto:${this.data.url}`;
        },
    },
};
</script>
