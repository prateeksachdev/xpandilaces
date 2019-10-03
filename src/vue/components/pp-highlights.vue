<template>
  <ul class="columns is-mobile is-gapless">
    <li v-for="highlight in highlights" :key="highlight.text" class="column">
      <div class="img-wrap">
        <img :data-src="highlight.icon_url" class="lazyload"/>
      </div>
      <p class="text-mobile" :style="{color: textColor}" v-html="highlight.text"></p>
      <p class="text-desktop" :style="{color: textColor}" v-html="highlight.text_desktop"></p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PpHighlights',
  props: {
    highlights: Array,
    textColor: String
  }
}
</script>

<style lang="scss" scoped>
</style>
