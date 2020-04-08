<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <search/>
            <div class="cart" id="cart">
                <button class="btn-cart" @click="$refs.cart.show = !$refs.cart.show">Cart</button>
                <cart ref="cart"/>
            </div>
        </header>
        <main >
            <catalog ref="catalog"/>
        </main>
    </div>
</template>

<script>
import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
export default {
    components: {catalog, cart},
    methods: {
        getData(url) {  
            return  fetch(url).then(data => data.json())
        },
    }
}
</script>
