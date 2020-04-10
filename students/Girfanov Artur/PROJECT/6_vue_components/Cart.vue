<template>
    <div class="cart-block " v-show="show">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :item="item" :type="'cart'"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
        </div>
    </div>
</template>

<script>
    import item from '../components/Item.vue'
    export default {
        components: {item},
        data() {
            return {
                show: false,
                items: [],
                url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
            }
        },
        // methods: {},
        // computed: {},
        mounted() {
            this.$parent.getData(this.url)
                .then(data => {
                    this.items = data.contents;
                })
        }
    }
</script>