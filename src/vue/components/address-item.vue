<template>
  <div>
    <div class="addresses">
      <slot name="address-item"></slot>
      <slot name="action-button" :toggleEditAddressForm="toggleEditAddressForm"></slot>
      <div v-if="isEditAddressFormVisible">
        <slot name="edit-form" :toggleEditAddressForm="toggleEditAddressForm"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Account',
    data () {
      return {
        isEditAddressFormVisible: false,
      }
    },
    watch: {
      isEditAddressFormVisible () {
        setTimeout(function() {
          new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {hideElement: 'AddressProvinceNewContainer'}); 
        }, 300)
      }
    },
    methods: {
      toggleEditAddressForm () {
        this.isEditAddressFormVisible = !this.isEditAddressFormVisible;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>