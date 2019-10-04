<template>
  <div>
    <div class="container">
      <div v-if="tab.top_media" class="top-video">
        <video v-if="tab.top_media.type === 'Video'" preload="none" autoplay="" loop="loop" muted playsinline>
          <source :src="tab.top_media.file_url" type="video/mp4">
        </video>
      </div>

      <h2>{{tab.heading}}</h2>

      <div class="videos">
        <div v-for="chunk in chunk(tab.showcases, 2)" :key="chunk[0].text" class="columns">
          <div v-for="showcase in chunk" :key="showcase.title" class="column">
            <div class="wrap">
              <video v-if="showcase.media.type === 'Video'" preload="none" autoplay="" loop="loop" muted playsinline>
                <source :src="showcase.media.file_url" type="video/mp4">
              </video>

              <img v-if="showcase.media.type === 'Image'" :data-src="cdnURL(showcase.media.file_url, 'w_800')" class="lazyload">
            </div>
            
            <div class="content">
              <img class="icon lazyload" :data-src="showcase.icon_url">
              <h3 v-html="showcase.title"></h3>
              <div class="divider"></div>
              <p>{{showcase.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab.highlights.length > 0" class="highlights">
      <div class="container">
        <div v-for="highlight in tab.highlights" :key="highlight.heading" class="columns">
          <div class="column text">
            <p class="caption">{{ highlight.subheading }}</p>
            <h3>{{ highlight.heading }}</h3>
            <p>{{ highlight.content }}</p>
          </div>

          <div class="column media">
            <img v-if="highlight.media.type === 'Image'" class="lazyload" :data-src="highlight.media.file_url">

            <video v-if="highlight.media.type === 'Video'" preload="none" autoplay="" loop="loop" muted playsinline>
              <source :src="highlight.media.file_url" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cdnURL } from '../filters'

export default {
  name: 'PtabOverview',
  props: {
    tab: Object,
    product: Object
  },
  methods: {
    cdnURL: cdnURL,

    chunk (array, size) {
      const chunkedArr = []
      let index = 0
      while (index < array.length) {
        chunkedArr.push(array.slice(index, size + index))
        index += size;
      }
      return chunkedArr
    }
  }
}
</script>

<style lang="scss" scoped>
</style>