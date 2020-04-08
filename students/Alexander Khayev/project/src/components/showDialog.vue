<template>
  <div class="modal">
    <div class="msg">
      <h1>Псевдомодальное окно</h1>
      <hr>
      <div>{{value}}</div>
      <hr>
      <button @click="close" autofocus>Close</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "showDialog",
    data() {
      return {
        value: 'hz',
      }
    },
    methods: {
      close() {
        this.$root.$emit("closeModal");
      }
    }
  }
</script>

<style>
  .modal {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
    position: absolute;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    text-align: center;
  }

  .modal > .msg {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    border: 1px solid gray;
    top: 25vh;
    min-height: 200px;
    position: absolute;
  }

  .modal button {
    margin-top: 50px;
    padding: 10px 40px;
    text-align: center;
  }
</style>
