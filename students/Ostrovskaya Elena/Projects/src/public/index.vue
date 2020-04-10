<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <search/>
            <div class="cart" id="cart">
                <button class="btn-cart" @click="$refs.cart.seen = !$refs.cart.seen">Cart</button>
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
import search from './components/search.vue'
export default {
    components: {catalog, cart, search},
    methods: {

        //Пока у нас нет сервера, а есть ток заглушка будет одинаково, но ограничиватся одним методом не стала
        getData(url) {  
            return  fetch(url).then(data => data.json())
        },
        postData (url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            }).then(data => data.json())
        },
        addData(url) {  
            return  fetch(url).then(data => data.json())
        },
        deleteData(url) {  
            return  fetch(url).then(data => data.json())
        },
    }
}
</script>
