<template>
  <div class="section login">
    <div class="container">
      <slot name="title"></slot>
      <transition name="slide-fade">
        <div class="login-form box" v-if="!isForgotPasswordVisible && initialLoad">
          <slot name="login-box" :toggleForgotPassword="toggleForgotPassword"></slot>
        </div>
      </transition>

      <transition name="slide-fade">
        <div class="login-form box" v-if="isForgotPasswordVisible">
          <slot name="reset-password-box" :toggleForgotPassword="toggleForgotPassword"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        isForgotPasswordVisible: false,
        initialLoad: false,
      }
    },
    mounted () {
      this.initialLoad = true

      const hash = window.location.hash
      if (hash === '#recover') {
        this.isForgotPasswordVisible = true
      }
    },
    methods: {
      toggleForgotPassword () {
        this.isForgotPasswordVisible = !this.isForgotPasswordVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>