<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <cart ref="cartRef"/>
        </header>
        <main>
            <catalog ref="catalogRef"/>
        </main>
    </div>
</template>

<script>
    import catalog from './Containers/Catalog.vue'
    import cart from './Containers/Cart.vue'
    export default {
        components: { catalog, cart },
        methods: {
            getData (url) {
                return fetch(url).then(dataReceived => dataReceived.json())
            },
        }
    }
</script>

<style>
</style>
