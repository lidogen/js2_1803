<template>
    <div id="cart-block" v-show="showCart">

        <template v-if="quantity">
            <div class="d-flex justify-content-between">
                <strong class="d-block">Всего товаров:</strong>
                <div id="quantity">{{quantity}}</div>
            </div>
            <hr>
            <div id="cart-items">
                <item v-for="item of items" :key="item.id_product" type="cart" :item="item" @removeCartItem="deleteProduct"/>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <strong class="d-block">Общая ст-ть:</strong>
                <div id="price">{{total}} руб.</div>
            </div>
            <div class="d-flex justify-content-between">
                <button name="cart-cleaner" class="btn btn-danger mt-3" @click="clearProducts">Очистить корзину</button>
            </div>
        </template>

        <template v-else>
            <span>Корзина пуста</span>
        </template>

    </div>
</template>

<script>
import item from "../components/Item.vue";
import {URL_GET_CART, URL_ADD_CART, URL_DEL_CART} from "../CONSTANTS";

export default {
    components: { item },
    data() {
        return {
            items: [],
            total: 0,
            quantity: 0,

            showCart: true
        }
    },
    methods: {
        _toggleCart(){
            this.showCart = !this.showCart
        },
        _createNewProduct (product) {
            return {
                id_product: +product.id_product,
                product_name: product.product_name,
                price: +product.price,
                quantity: 1
            }
        },

        _checkTotalAndSum () {
            let quantity = 0
            let total = 0

            this.items.forEach (item => {
                quantity += item.quantity
                total += item.price * item.quantity
            })

            this.quantity = quantity
            this.total = total
        },

        addProduct (product) {
            this.$parent.getData(URL_ADD_CART)
                .then( () => {
                    let find = this.items.find (item => item.id_product === product.id_product)
                    if (find) {
                        find.quantity++
                    } else {
                        this.items.push (this._createNewProduct(product))
                    }
                })
                .then( () => this._checkTotalAndSum() )
        },

        deleteProduct (product) {
            this.$parent.getData(URL_DEL_CART)
                .then( () => {
                    let find = this.items.find (item => item.id_product === product.id_product)
                    if (find.quantity > 1) {
                        find.quantity--
                    } else {
                        this.items.splice (this.items.indexOf(find), 1)
                    }
                } )
                .then( () => this._checkTotalAndSum() )
        },

        clearProducts () {
            this.$parent.getData(URL_DEL_CART)
                .then( () => this.items = [] )
                .then( () => this._checkTotalAndSum() )
        },
    },
    mounted() {
        this.$parent.getData(URL_GET_CART)
            .then(data => {
                this.items = data.contents
                this.quantity = data.countGoods
                this.total = data.amount
            })
    }
}
</script>
