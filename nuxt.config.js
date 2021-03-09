import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "SITPI",
    title: "SITPI",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "theme_color" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/api.js"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    //prefix: "/api/v1",
    port: 9090,
    host: "localhost",
    https: false
  },
  router: {
    middleware: "auth"
  },
  auth: {
    redirect: {
      login: "/login",
      logout: "/login",
      home: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "response_data.token"
          },
          logout: { url: "/auth/logout", method: "post" },
          user: {
            url: "/auth/get-user",
            method: "post",
            propertyName: "response_data"
          }
        }
      }
    }
  },

  // PWA configuration
  pwa: {
    meta: {
      title: "SITPI"
    },
    manifest: {
      name: "SITPI"
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#2B5B9D",
          accent: colors.grey.darken3,
          secondary: "#4875B0",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: "#4CAF50",
          background_login: "#C5DEF0"
        }
      }
    }
  },
  /*
  server: {
    port: 8000,
    host: "0.0.0.0"
  },
*/
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
