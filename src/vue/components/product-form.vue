<template>
  <div class="columns">
    <div class="column gallery">
      <product-gallery
        :images="images(variantId)"
        :loading-gif-url="loadingGifUrl"
      ></product-gallery>
      <slot name="shoes-types-desktop"></slot>
    </div>

    <div class="column controls">
      <div class="brief">
        <slot name="brief"></slot>
        <slot name="stamped-review-desktop"></slot>
        <p class="selected-swatch-text mobile"><span class="cm_label">Color:</span> {{ variant.title }}</p>
        <slot name="price-note-mobile"></slot>
      </div>

      <div class="price">
        <span>{{ variant.price }}</span> <slot name="price-note-desktop"></slot>
      </div>

      <slot name="stamped-review-mobile"></slot>

      <div class="swatch">
        <product-swatch
          :variants="variants"
          :variant-id="variantId"
          :click-count="clickCount"
          @selected="setVariant"
        ></product-swatch>
        <p class="selected-swatch-text desktop"><span class="cm_label">Color:</span> {{ variant.title }}</p>
      </div>

      <div class="promo mobile">
        <slot name="promo"></slot>
      </div>

      <cart-control
        :variant-id="variantId"
        :atc-text-color="atcTextColor"
        :atc-bg-color="atcBgColor"
      ></cart-control>

      <div class="promo desktop">
        <slot name="promo"></slot>
      </div>

      <slot name="shoes-types-mobile"></slot>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import store from "../store";
import ProductGallery from "./product-gallery.vue";
import ProductSwatch from "./product-swatch.vue";
import CartControl from "./cart-control.vue";

export default {
  name: "ProductForm",
  components: {
    ProductGallery,
    ProductSwatch,
    CartControl
  },
  props: {
    rawImageGroupData: String,
    rawVariantsData: String,
    defaultVariantId: String,
    loadingGifUrl: String,
    atcTextColor: String,
    atcBgColor: String
  },
  data: function() {
    return {
      show: false,
      variantId: this.defaultVariantId
    };
  },
  computed: {
    imageGroups() {
      if (this.rawImageGroupData) {
        let images = {};

        this.rawImageGroupData.split("`~~`").forEach(raw => {
          let data = raw.split("`~`");

          if (data.length < 4) {
            return;
          }

          let id = data[0].trim();
          let alt = data[1].trim();
          let groupId = alt
            .replace(/\s/g, "")
            .toLowerCase()
            .split("-")[0];

          images[groupId] = images[groupId] || [];
          images[groupId].push({
            id: id,
            alt: alt,
            smLink: data[2],
            mdLink: data[3]
          });
        });

        return images;
      }

      return {};
    },

    variants() {
      if (this.rawVariantsData) {
        let variants = {};

        this.rawVariantsData.split("`~~`").forEach(rawData => {
          let data = rawData.split("`~`");
          if (data.length < 8) {
            return;
          }

          let id = data[0].trim();
          variants[id] = {
            title: data[1].trim(),
            groupId: data[1].replace(/\s/g, "").toLowerCase(),
            price: data[2],
            swatchImageUrl: data[3],
            image: {
              id: data[4],
              alt: data[5],
              smLink: data[6],
              mdLink: data[7]
            }
          };
        });

        return variants;
      }

      return {};
    },

    variant() {
      return this.variants[this.variantId];
    }
  },
  methods: {
    images(variantId) {
      let variant = this.variants[variantId];
      let avatarImage = [variant.image];
      if (!variant.image || !variant.image.id) {
        avatarImage = [];
      }

      let additionalImages = this.imageGroups[variant.groupId] || [];
      if (this.imageGroups["allcolour"]) {
        return avatarImage
          .concat(additionalImages)
          .concat(this.imageGroups["allcolour"]);
      }

      return avatarImage.concat(additionalImages);
    },

    setVariant(variantId) {
      this.variantId = variantId;

      if (history.pushState) {
        let params = qs.parse(location.search.substring(1));
        params["variant"] = variantId;
        let qstring = qs.stringify(params);

        var newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          `?${qstring}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
        store.state.currentProCount = 1;
        console.log("other swatch clicked");
      }
      console.log("swatch clicked");
    }
  }
};
</script>

<style lang="scss" scoped></style>
