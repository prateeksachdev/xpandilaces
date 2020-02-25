<template>
  <div class="container">
    <div class="videos">
      <div v-for="youtubeURL in tab.youtube_urls" class="video">
        <iframe class="lazyload" :data-src="embedUrl(youtubeURL)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PtabInstallation',
  props: {
    tab: Object,
    product: Object
  },
  methods: {
    embedUrl (url) {
      return url.replace('watch?v=', 'embed/')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>