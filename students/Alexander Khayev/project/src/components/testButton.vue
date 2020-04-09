<template>
  <input type="text" :value="value" class="btn-cart" @input="testEvent" />
</template>

<script>
  export default {
    name: "test-button",
    props: {
      value: String,
    },
    data: function () {
      return {
      }
    },
    methods: {
      testEvent: function(e) {
        this.$emit("input", e.target.value);
      }
    }
  }
</script>

<style>

</style>
