<template>
  <div class="products">
    <div class="product-item" v-for="item in showItems" :key="item.id_product">
      <div class="product-item">
        <img :src="item.img" width="300" height="200" :alt="item.product_name">
        <div class="desc">
          <h1>{{item.product_name}}</h1>
          <p>${{item.price}}</p>
          <button
            class="buy-btn"
            name="buy-btn"
            @click="$root.$emit('addToCart', item)"
          >Купить
          </button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "catalog",
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        items: [],
      }
    },
    mounted() {
      this.$parent.getData("/catalogData.json")
        .then(data => {
          this.items = data;
        })
    },
    methods: {},
    computed: {
      showItems() {
        return this.items.filter(item => item.product_name.toLowerCase().includes(this.value));
      }
    },
    _initData() {

    },
    _initHandlers() {
      // this.$root.$on("searchUpdate", "_updateSearch")
    },
    // _updateSearch(value) {
    // },
  }
</script>

<style>
  .products {
    column-gap: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: 1fr;
    padding: 40px 80px;
    justify-content: flex-start;
  }

  p {
    margin: 0 0 5px 0;
  }

  .product-item {
    display: flex;
    flex-direction: column;
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    margin: 20px 0;
  }

  img {
    max-width: 100%;
    height: auto
  }

  .desc {
    border: 1px solid #c0c0c040;
    padding: 15px
  }

  .desc h1 {
    font-size: 1em;
  }

  .buy-btn {
    margin-top: 5px;
    padding: 5px 15px;
  }

  .buy-btn {
    background-color: #2f2a2d;
    border: 1px solid transparent;
    color: #fafafa;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }

  .buy-btn:hover {
    background-color: #fafafa;
    color: #2f2a2d;
    border: 1px solid #2f2a2d;
  }

</style>
