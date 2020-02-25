<template>
  <div class="section bottom-banner" v-if="isBottomBannerVisible" :style="{ backgroundColor: backgroundColor }">
    <div class="container">
      <div class="columns">
        <div class="column">
          <slot name="title"></slot>
        </div>
        <div class="column">
          <div class="columns promotion-code">
            <slot name="items"></slot>
          </div>
        </div>
      </div>

      <a @click="hideBottomBanner" href="javascript:;" class="close">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20px" xml:space="preserve"><g id="_x37_12-_close__x2C__cross__x2C__cancel__x2C_"><g><line style="fill:none;stroke:#fff;stroke-width:13.4167;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2.6131;" x1="486.21" x2="26.739" y1="26.814" y2="486.139"/><line style="fill:none;stroke:#fff;stroke-width:13.4167;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2.6131;" x1="486.21" x2="26.739" y1="486.139" y2="26.814"/></g></g><g id="Layer_1"/></svg>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BottomBanner',
    props: {
      backgroundColor: String
    },
    data () {
      return {
        isBottomBannerVisible: localStorage.getItem('isBottomBannerVisible') != 'false',
      }
    },
    methods: {
      hideBottomBanner() {
        this.isBottomBannerVisible = false
        localStorage.setItem('isBottomBannerVisible', 'false')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
