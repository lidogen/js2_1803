<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <search />
                <button class="btn-cart" @click="cart_show = !cart_show">Cart</button>
                <cart v-show="cart_show" ref="cartRef" />
            </div>
        </header>
        <main>
            <catalog ref="catalogRef" />
        </main>
    </div>
</template>

<script>
//add packages (imports)
import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
import search from './components/search.vue'
export default {
    components: { catalog, cart, search },
    data(){
        return{
            cart_show: false
        }
    },
    methods: {
        getData(url) {
            return fetch(url).then(dataReceived => dataReceived.json())
        }
    }
}
</script>

<style>

</style>