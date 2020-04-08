<template>
  <div class="logo">{{value}}</div>
</template>

<script>
  export default {
    name: "logo-menu",
    props: ["value"],
    data: function () {
      return {}
    }
  }
</script>

<style>
  .logo {

    text-transform: uppercase;
    font-weight: bold;
  }
</style>
