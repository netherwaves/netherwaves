import gql from "graphql-tag";

export default {
    state: () => ({
        navigation: {},
        globals: {},
        loaderOut: 0.4
    }),

    mutations: {
        SET_NAVIGATION(state, navigation) {
            state.navigation = navigation;
        },
        SET_GLOBALS(state, globals) {
            state.globals = globals;
        }
    },

    actions: {
        async nuxtServerInit({commit}, {app}) {
            let client = app.apolloProvider.defaultClient;

            const {data} = await client.query({
                query: gql`{
                    globals {
                        socials {
                            email
                            twitter
                            bandcamp
                            soundcloud
                            github
                        }
                    }
                    navigation: entries(section: [navigation]) {
                        ... on Navigation {
                            id
                            title
                            href
                        }
                    }
                }`
            });

            const {globals, navigation} = data;

            commit('SET_NAVIGATION', navigation);
            commit('SET_GLOBALS', globals);
        }
    }
};
