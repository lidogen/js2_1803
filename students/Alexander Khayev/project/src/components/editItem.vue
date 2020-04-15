<template>
  <div class="product-item">
    <div class="desc">
      <label>
        Name <input type="text" v-model="product_name" />
      </label>
      <label>
        Price<input type="number" v-model="price" />
      </label>
<!--      <label>-->
<!--        Img<input type="file" name="fi" :change="setFile"/>-->
<!--      </label>-->
      <button class="buy-btn" name="buy-btn" @click.stop="createNew">Создать</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "editItem.vue",
      data() {
          return {
            product_name: "",
            price: 0,
          }
      },
      methods: {
          setFile(data) {
            // let frm = new FormData();
            // frm.append('file', fi);
          },
          createNew() {
            this.$emit("createNewProduct", {
              product_name: this.product_name, price: +this.price, imgUrl: ""});
            this.product_name  = "";
            this.price = 0;
          }
      },
    }
</script>

<style scoped>

</style>
