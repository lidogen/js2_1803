<template>
    <div class="d-flex flex-column min-vh-100">
        <header>
            <div class="container">
                <div class="d-flex justify-content-between">
                    <div class="logo">E-shop</div>
                    <div class="position-relative">
                        <SearchBar ref="SearchBarRef" />
                        <button name="cart-btn" class="btn-cart" @click="toggleCart">Cart</button>
                        <Cart ref="CartRef" />
                    </div>
                </div>
            </div>
        </header>
        <main class="mb-4">
            <MessageBar ref="MessageBarRef" />
            <Catalog ref="CatalogRef" />
        </main>
        <footer>
            <div class="container">
                <div class="d-flex justify-content-between">
                    <div class="logo">E-shop</div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import MessageBar from './containers/MessageBar.vue'
import SearchBar from './containers/SearchBar.vue'
import Catalog from './containers/Catalog.vue'
import Cart from './containers/Cart.vue'

import {API_URL} from "./CONSTANTS";

export default {
    components: { Catalog, Cart, SearchBar, MessageBar },
    methods: {
        toggleCart() {
            this.$refs.CartRef._toggleCart()
        },
        getData(url) {
            return fetch(API_URL + url)
                .then( response => response.json() )
                .catch( (err) => {
                    console.log(err)
                    this.$refs.MessageBarRef._sendMessages("danger", "Ошибка. Данные не могут быть получены ")
                })
        },
    }
}
</script>

<style>

</style>
