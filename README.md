# XPAND Theme

This theme is built using [Slate](https://github.com/Shopify/slate), [Vue](https://vuejs.org/) and [Bulma](https://bulma.io/).

## Getting started

1. Rename `.env.example` to `.env`.
2. Follow the instruction [here](https://shopify.github.io/slate/docs/connect-to-your-store) to add in the information to `.env`.
3. Follow the instruction [here](https://shopify.github.io/slate/docs/create-a-self-signed-ssl-certificate) to create a self signed SSL certificate.
4. Start the development server using `npm run start`.
5. Learn about slate [here](https://shopify.github.io/slate/docs/about)

## Vue

This theme is built using Vue. Because liquid code cannot be directly added to Vue components, the theme uses [slot](https://vuejs.org/v2/guide/components-slots.html) to take in any data that may contain HTML from liquid.

The general structure of a Shopify theme remains the same, [Templates](https://help.shopify.com/en/themes/development/templates) are built using [Sections](https://help.shopify.com/en/themes/development/sections) which may include [Snippets](https://help.shopify.com/en/themes/development/templates#snippets).

However a lot of sections in this theme are just built using a Vue component which lives in `src/vue/components`.

The theme try to make use of [Single File Components](https://vuejs.org/v2/guide/single-file-components.html), however when trying to add CSS directly to the component Slate have trouble building the production version so right now all CSS file lives in `src/styles` folder following the Shopify Slate convention.

For global state management like cart, this theme didn't use [Vuex](https://vuex.vuejs.org/) since the global state are fairly simple and vuex seems to be an overkill. A simple store is implemented with plain javascript in `src/vue/store.js`.

## jQuery

This theme require jQuery for making AJAX request. This may seem werid because usually a Vue project doesn't use jQuery. The reason for this is other third-party Shopify app loads jQuery regardless, so we might as well just use jQuery for AJAX instead of loading another library.

