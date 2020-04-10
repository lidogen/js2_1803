<template>
    <div :class="type === 'catalog' ? 'col-sm-4 col-lg-3 col-lg-2 mb-4' : 'cart-item'">
        <template v-if="type === 'catalog'">
            <div class="card">
                <img class="card-img-top" :src="imgCompute" :alt="item.product_name">
                <div class="card-body">
                    <h4 class="card-title">{{ item.product_name }}</h4>
                    <p class="card-text">{{ item.price }} руб.</p>
                    <button class="btn btn-primary" @click="addItem">Купить</button>
                </div>
            </div>
        </template>
        <template v-if="type === 'cart'">
            <div class="cart-img">
                <img :src="imgCompute" :alt="item.product_name">
            </div>
            <div class="product-desc">
                <p class="product-title">{{ item.product_name }}</p>
                <p class="product-quantity">Количество: {{ item.quantity }}</p>
                <p class="product-single-price">Цена: {{ item.price }}</p>
            </div>
            <div class="right-block">
                <button name="btn-del"
                        class="btn btn-danger"
                        :data-id="item.id_product"
                        @click="removeItem">&times;</button>
            </div>
        </template>
    </div>
</template>

<script>
import {IMG_PLACEHOLDER, IMG_PLACEHOLDER_CART} from "../CONSTANTS";

export default {
    props: {
        type: {
            type: String,
            default: 'catalog'
        },
        item: {
            type: Object
        }
    },
    methods: {
        removeItem: function() {
            if (this.type !== "cart")
                return
            this.$emit('removeCartItem', this.item);
        },
        addItem: function() {
            if (this.type !== "catalog")
                return
            this.$emit('add-product', this.item);
        },
    },
    computed: {
        imgCompute() {
            return this.type === 'catalog' ? IMG_PLACEHOLDER : IMG_PLACEHOLDER_CART
        }
    }
}
</script>
