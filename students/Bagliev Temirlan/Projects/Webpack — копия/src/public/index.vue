<template>
    <div>
         <header>
            <div class="logo">E-shop</div>
            <div class="cart">
                <form action="#" class="search-form">
                    <input type="text" class="search-field">
                    <button class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                <button class="btn-cart">Cart</button>
                <div class="cart-block ">
                    <div class="d-flex">
                        <strong class="d-block">Всего товаров</strong> <div id="quantity"></div>
                    </div>
                    <hr>
                    <div class="cart-items">
                        
                    </div>
                    <hr>
                    <div class="d-flex">
                        <strong class="d-block">Общая ст-ть:</strong> <div id="price"></div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="products"></div>
        </main>
    </div>
</template>

<script>
//add packages (imports)
import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
export default {
    data(){
        return{
            search: ""
        }
    },
    components: {catalog, cart},
    methods: {
        getData(url) {  
            return  fetch(url).then(dataReceived => dataReceived.json())
        },
        addData (url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            }).then(d => d.json())
        },
    }
}
</script>