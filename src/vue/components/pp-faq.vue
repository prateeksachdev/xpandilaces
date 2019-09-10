<template>
  <section class="section faq">
    <div class="container">
      <h2>{{ heading }}</h2>

      <div class="columns">
        <ul class="column faq-content">
          <faq-item v-for="item in faq.items" :key="item.question">
            <template #question>
              {{ item.question }}
            </template>

            <template #answer>
              <p>{{ item.answer }}</p>
            </template>
          </faq-item>
        </ul>
      </div>

      <a :href="faq.link" class="button">{{ faq.link_text }}</a>
    </div>
  </section>
</template>

<script>
import faqItem from './faq-item.vue'

export default {
  name: 'PpFaq',
  components: {
    faqItem
  },
  props: {
    faq: Object
  },
  computed: {
    heading () {
      return this.faq.heading || 'Frequently Asked Questions'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
