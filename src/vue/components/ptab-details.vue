<template>
  <div class="container">
    <div v-for="highlight in tab.highlights" :key="highlight.heading" class="columns">
      <div class="column is-4 text">
        <h3>{{ highlight.heading }}</h3>
        <b>{{ highlight.subheading }}</b>
        <p>{{ highlight.content }}</p>
      </div>

      <div class="column is-8 media">
        <img v-if="highlight.media.type === 'Image'" class="lazyload" :data-src="highlight.media.file_url">

        <video v-if="highlight.media.type === 'Video'" preload="none" autoplay="" loop="loop" muted playsinline>
          <source :src="highlight.media.file_url" type="video/mp4">
        </video>
      </div>
    </div>

    <div v-for="detail in tab.details" :key="detail.title" class="detail">
      <h3>{{detail.title}}</h3>
      <div class="divider"></div>
      <p>{{detail.text}}</p>
      
      <div class="img-wrap">
        <img :src="detail.image_url" class="lazyload" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PtabDetails',
  props: {
    tab: Object,
    product: Object
  }
}
</script>

<style lang="scss" scoped>
</style>