<template>
    <div>
        <span>shop name is: {{test}}</span>
    </div>
</template>

<script>
  export default {
    delimiters: ["${","}"],
    props: {
      shopname: String,
    },
    data () {
      return {
        test: 'test'
      }
    },
    name: 'ThemeComponent'
  };
</script>