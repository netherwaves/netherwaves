import axios from 'axios';

const pkg = require('./package');
require('dotenv').config();
const consola = require('consola');

import fs from 'fs';
import path from 'path';

module.exports = {
    /**
     * Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'msapplication-TileColor', content: '#da532c' },
            { name: 'theme-color', content: '#181818' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
        ]
    },

    /**
     * Customize the progress-bar color
     */
    loading: {color: '#000'},

    /**
     * Global CSS
     */
    css: [
        '~assets/scss/application.scss'
    ],

    /**
     * Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/axios.js' },
        { src: '~/plugins/vue-inject.js' },
        { src: '~/plugins/animations.js', mode: 'client' },
        { src: '~/plugins/global.js' },
    ],

    /**
     * Nuxt.js modules
     */
    modules: [
        '@nuxtjs/apollo',
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/proxy',
        '@nuxtjs/redirect-module',
    ],

    buildModules: [
        '@nuxtjs/style-resources',
    ],

    styleResources: {
      scss: [
        './assets/scss/utils/variables.scss',
        './assets/scss/utils/tools.scss',
        './assets/scss/core/mixins.scss',
      ]
    },

    /**
     * Axios module configuration
     */
    axios: {
        proxy: true
    },

    /**
     * Proxy module configuration
     */
    proxy: {
        [process.env.GRAPHQL_PATH]: process.env.BACKEND_URL,
        '/actions': process.env.BACKEND_URL,
        '/robots.txt': process.env.BACKEND_URL,
        '/humans.txt': process.env.BACKEND_URL,
        '/sitemaps_*.xml': process.env.BACKEND_URL,
    },

    /**
     * Redirect module configuration
     */
    redirect: async () => {
        // Don't attempt to fetch redirects when this plug-in doesn't do anything anyways.
        if (process.argv.indexOf('build') > -1 || process.argv.indexOf('generate') > -1) {
            return [];
        }

        consola.info('Fetching redirects');
        const {data} = await axios.get(process.env.BACKEND_URL + '/actions/module/redirect');
        return [
            ...data,
            {from: '/admin', to: process.env.BACKEND_URL + '/admin'},
        ];
    },

    /**
     * Apollo module configuration
     */
    apollo: {
        clientConfigs: {
            default: '~/plugins/apollo-config.js',
        }
    },

    /**
     * Nuxt.js generate configuration
     */
    generate: {
        routes: async () => {
            const {data} = await axios.post(
                process.env.BACKEND_URL + process.env.GRAPHQL_PATH,
                {query: '{entries(section: []) {uri}}'},
                {headers: {'Authorization': 'Bearer ' + process.env.GRAPHQL_TOKEN}},
            );
            return data.data.entries.map(entry => '/' + entry.uri);
        }
    },

    /**
     * Build configuration
     */
    build: {
        extractCSS: true,

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            config.node = {
                fs: 'empty'
            };
            config.resolve.alias['vue'] = 'vue/dist/vue.common';
        },
        transpile: ['gsap'],

        babel: {
            presets() {
                return [
                    ["@nuxt/babel-preset-app", { corejs: { version: 3 } }]
                ]
            },
            plugins() {
                return [
                    "@babel/plugin-proposal-function-bind"
                ]
            }
        }
    },

    /**
     * PurgeCSS whitelist.
     */
    purgeCSS: {
        whitelist: [
            // 'css-selector-to-whitelist'
        ],
    },

    server: {
        port: process.env.PORT,
        host: process.env.HOST,
        https: {
            key: fs.readFileSync(path.resolve(process.env.CERT_LOCATION, 'privkey.pem')),
            cert: fs.readFileSync(path.resolve(process.env.CERT_LOCATION, 'fullchain.pem'))
        }
    },

    pageTransition: {
      leave(el, done) {
        this.$nuxt.$emit('loader-leave', { el, done });
      },
    },
};