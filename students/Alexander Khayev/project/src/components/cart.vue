<template>
  <div class="cart-block" v-if="cartItems.length == 0">
    <h3>Нет данных</h3>
  </div>
  <div class="cart-block" v-else>

    <div class="d-flex">
      <strong class="d-block">Total items: {{totalItems}} </strong>
      <div id="quantity"></div>
    </div>
    <hr>
    <div class="cart-item" :data-id="item.id_product" v-for="item in cartItems" :key="item.id_product">
      <img :src="item.img" alt="">
      <div class="product-desc">
        <p class="product-title">{{ item.product_name }}</p>
        <p class="product-quantity">{{ item.quantity }}</p>
        <p class="product-single-price">{{ item.price }}</p>
      </div>
      <div class="right-block">
        <button name="del-btn"
                class="del-btn"
                @click="_deleteFromCart"
                :data-id="item.id_product">&times;
        </button>
      </div>

    </div>

    <hr>
    <div class="d-flex">
      <strong class="d-block">Totalprice: ${{totalPrice}}</strong>
      <div id="price"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "cart",
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
        return this.cartItems.reduce((start, current) => start + current.price, 0)
      },
    },
    mounted() {
      this._initData();
      this._initHandlers();
    },
    methods: {
      _deleteFromCart(event) {
        let obj = this._findItem(event.target.dataset.id);
        this.$parent.putData("/deleteFromBasket.json", obj)
        .then(res => {
          if (1 === res.result) {
            if (obj.quantity > 1) {
              obj.quantity--;
              this._rerender();
            } else {
              this.cartItems.splice(this.cartItems.indexOf(obj), 1);
            }
          }else {
            throw Error('Error delete item');
          }
        })
      },
      _initData() {
        this.$parent.getData("/getBasket.json")
          .then(data => {
            this.cartItems = data.contents;
          });
      },
      _initHandlers() {
        this.$root.$on("addToCart", this._addToCart);
      },
      _addToCart(obj) {
        this.$parent.putData("/addToBasket.json", obj)
          .then(res => {
            if (1 === res.result) {
              let find = this._findItem(obj.id_product);
              if (find === undefined) {
                obj.quantity = 1;
                this.cartItems.push(obj);
              } else {
                ++find.quantity;
                // дальше костыль, чтобы перерендерить
                this._rerender();
              }
            } else {
              throw Error('Error add item');
            }
          })
      },
      _findItem(id) {
        return this.cartItems.find(product => +product.id_product === +id);
      },
      _rerender() {
        this.$forceUpdate();
        //this.cartItems = this.cartItems.filter(() => true);
      }
    },
  }
</script>

<style>
  .cart-block {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.62);
    border-radius: 5px;
    box-sizing: border-box;
    right: 0;
    top: 130%;
    position: absolute;
    background-color: white;
    padding: 20px;
    color: black;
    width: 300px;
  }

  .cart-block:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -10px;
    right: 35px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }

  .del-btn {
    background-color: #2f2a2d;
    border: 1px solid transparent;
    color: #fafafa;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }

  .del-btn:hover {
    background-color: #fafafa;
    color: #2f2a2d;
    border: 1px solid #2f2a2d;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
  }

  .cart-item:not(:last-child) {
    margin-bottom: 20px;
  }

  .cart-item img {
    align-self: flex-start;
    margin-right: 15px;
    width: 40%;
  }

  .product-single-price {
    color: #474747;
    font-size: 0.5em;
  }

  .product-desc {
    width: calc(60% - 40px);
  }

  .product-quantity {
    margin-top: 15px;
    font-size: 0.75em;
  }

</style>
