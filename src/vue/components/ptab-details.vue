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

    <div v-if="tab.size.reference_name" class="size-chart">
      <h3>SIZE CHART</h3>

      <table class="table">
        <tbody>
          <tr>
            <td rowspan="9" class="gender">Women</td>
            <td class="size-name">{{tab.size.reference_name}}</td>
            <td class="size-name">{{tab.size.matching_name}}</td>
          </tr>
          <tr v-for="size in tab.size.women_sizes" :key="size.reference_size">
            <td>{{size.reference_size}}</td>
            <td>{{size.matching_size}}</td>
          </tr>
        </tbody>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <td rowspan="9" class="gender">Men</td>
            <td class="size-name">{{tab.size.reference_name}}</td>
            <td class="size-name">{{tab.size.matching_name}}</td>
          </tr>
          <tr v-for="size in tab.size.men_sizes" :key="size.reference_size">
            <td>{{size.reference_size}}</td>
            <td>{{size.matching_size}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-for="detail in tab.details" :key="detail.title" class="detail">
      <h3>{{detail.title}}</h3>
      <div class="divider"></div>
      <p v-html="detail.text"></p>
      
      <div class="img-wrap">
        <img :data-src="detail.image_url" class="lazyload">
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