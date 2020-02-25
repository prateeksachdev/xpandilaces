<template>
  <div class="columns">
    <div class="column is-4 sidebar">
      <button type="button" class="btn" @click="toggleNewAddressForm">ADD A NEW ADDRESS</button>
    </div>
    <div class="column is-8 account-info">
      <div v-if="isNewAddressFormVisible">
        <slot name="new-address" :toggleNewAddressForm="toggleNewAddressForm"></slot>
      </div>
      <slot name="addresses"></slot>
    </div>
  </div>
</template>

<script>  
  export default {
    name: 'Account',
    data () {
      return {
        isNewAddressFormVisible: false,
      }
    },
    watch: {
      isNewAddressFormVisible () {
        setTimeout(function() {
          new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {hideElement: 'AddressProvinceNewContainer'}); 
        }, 300)
      }
    },
    methods: {
      toggleNewAddressForm () {
        this.isNewAddressFormVisible = !this.isNewAddressFormVisible;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>