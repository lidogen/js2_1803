<template>
  <div class="cart-block" v-if="cartItems.length === 0">
    <h3>Нет данных</h3>
  </div>

  <div class="cart-block" v-else>
    <div class="d-flex">
      <strong class="d-block">Total items: {{totalItems}} </strong>
    </div>
    <hr>
    <cartItem v-for="item in cartItems" :key="item.id_product" :item="item" @delete="_deleteFromCart"/>
    <hr>
    <div class="d-flex">
      <strong class="d-block">Total price: ${{totalPrice}}</strong>
    </div>
  </div>
</template>

<script>

  export default {
    name: "cart",
    components: {
      'cartItem': () => import('../components/cartItem.vue'),
    },
    data() {
      return {
        cartItems: [],
      }
    },
    computed: {
      totalItems() {
        return this.cartItems.reduce((start, current) => start + current.quantity, 0)
      },
      totalPrice() {
        return this.cartItems.reduce((start, current) => start + current.price * current.quantity, 0)
      },
    },
    mounted() {
      this._initData();
    },
    methods: {
      _initData() {
        this.$parent.getData("/api/basket.json")
          .then(data => {
            this.cartItems = data.contents;
          });
      },
      _deleteFromCart(cartItem) {
        this.$parent.putData("/api/delbasket.json", cartItem)
          .then(res => {
            if (1 === res.result) {
              if (cartItem.quantity > 1) {
                cartItem.quantity--;
              } else {
                this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
              }
            } else {
              throw Error('Error delete item');
            }
          })
      },
      addToCart: function (catalogItem) {
        let obj = this._createFromCatalogItem(catalogItem);// JSON.parse(JSON.stringify(prod)); // must be created NEW OBJECT!
        this.$parent.putData("/api/tobasket.json", obj)
          .then(res => {
            if (1 === res.result) {
              let find = this._findItem(obj.id_product);
              if (find === undefined) {
                this.cartItems.push(obj);
              } else {
                ++find.quantity;
              }
            } else {
              throw Error('Error add item');
            }
          })
      },
      _findItem(id) {
        return this.cartItems.find(product => +product.id_product === +id);
      },
      _createFromCatalogItem(catalogItem) {
        let obj = JSON.parse(JSON.stringify(catalogItem));
        obj.quantity = 1;
        return obj;
      },
    }
  }
</script>

<style>
</style>
