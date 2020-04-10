<template>
    <div>
        <div class="cart">
            <form action="#" class="search-form">
                <label>
                    <input type="text" class="search-field">
                </label>
                <button class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart" @click="show=!show">Cart</button>
            <div class="cart-block " id="cart-block" v-show="show">
                <div class="d-flex">
                    <strong class="d-block">Всего товаров</strong> <div id="quantity"></div>
                </div>
                <hr>
                <item :type="'cart'" v-for="item of items" :key="item.id_product" :item="item"/>
                <hr>
                <div class="d-flex">
                    <strong class="d-block">Общая ст-ть:</strong> <div id="price"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import item from '../Components/Item.vue'
    export default {
        components: { item },
        data() {
            return {
                show: false,
                items: [],
                url: 'https://raw.githubusercontent.com/Egorarefjev/online-store-api/master/responses/catalogData.json',
            }
        },
        mounted() {
            this.$parent.getData(this.url)
                .then(data =>{
                    this.items = data;
                });
        }
    }
</script>

<style>
</style>
